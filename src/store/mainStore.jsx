import { showNotification } from "@mantine/notifications"
import produce from "immer"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { notificationStyles } from "../globalStyles"
import { supabase } from "../utils/supabaseClient"
import useCharacterStore from "./characterStore"

const mainStore = (set, get) => ({
  menuOpen: false,
  isDesktop: true,
  user: null,
  userDetails: null,
  role: null,
  shopName: null,
  registered: false,
  cart: [],

  /* AUTH FUNCTION */
  useAuth() {
    const { data, error } = supabase.auth.getSession()
    set(() => ({
      user: data,
    }))
    return data
  },

  async handleLogOut() {
    let { error } = await supabase.auth.signOut()
    set(() => ({
      user: null,
      role: null,
      shopName: null,
    }))
  },

  async setUserData(session) {
    if (session === null) {
      showNotification({
        title: "Session Expired",
        message: "Cannot find your session",
        styles: notificationStyles,
      })
      set(() => ({
        user: null,
        role: null,
        shopName: null,
      }))
      return
    }

    const userId = session.user.id

    //get user data
    const { data: userDetails } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)

    //set user details
    set((state) =>
      produce(state, (draftState) => {
        draftState.userDetails = userDetails[0]
        draftState.cart = userDetails[0].cart
      })
    )

    //set role
    const role = userDetails[0].role

    //update body sizing and measurements
    useCharacterStore.getState().updateUserMeasurements(userDetails[0])

    //set registered
    if (userDetails[0].body_sizing) {
      set(() => ({
        registered: true,
      }))
    }

    if (role === "owner") {
      const shop = await supabase
        .from("shops")
        .select("shop_id")
        .eq("id", userId)

      set(() => ({
        user: userId,
        role: role,
        shopName: shop.data[0].shop_id,
      }))
    } else {
      set(() => ({
        user: userId,
        role: role,
        shopName: null,
      }))
    }
  },

  async refreshUserData() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      get().setUserData(session)
    })
  },

  /* FETCH FUNCTIONS */

  async fetchShopByID(shop_id) {
    const shop = await supabase
      .from("shops")
      .select("*")
      .eq("shop_id", shop_id)
      .single()

    return shop
  },

  async fetchShopByName(shop_name) {
    const shop = await supabase
      .from("shops")
      .select("*")
      .eq("shop_name", shop_name)
      .single()

    return shop
  },

  async fetchPopularShops() {
    const shop = await supabase.from("shops").select("*")

    return shop
  },

  async fetchProductByID(product_id) {
    const shop = await supabase
      .from("products")
      .select("*")
      .eq("product_id", product_id)
      .single()

    return shop
  },

  async fetchProductsByShopID(shop_id) {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("shop_id", shop_id)

    return data
  },

  async addToCart(product_id) {
    if (get().cart === null) {
      set((state) =>
        produce(state, (draftState) => {
          draftState.cart = [product_id]
        })
      )
    } else {
      set((state) => ({
        cart: [...state.cart, product_id],
      }))
    }

    await supabase
      .from("profiles")
      .update({ cart: get().cart }, { count: "exact" })
      .eq("id", get().user)
  },

  async removeFromCart(product_id) {
    let newCart = get().cart

    newCart = newCart.filter((el) => el !== product_id)

    set((state) =>
      produce(state, (draftState) => {
        draftState.cart = newCart
      })
    )

    await supabase
      .from("profiles")
      .update({ cart: newCart })
      .eq("id", get().user)
  },

  /* UI FUNCTION */

  onResize: () => {
    document
      .querySelector(":root")
      .style.setProperty("--vh", window.innerHeight / 100 + "px")

    set(() => ({
      isDesktop: window.innerWidth > 800,
    }))
  },

  handleMenuToggle: () => {
    set((state) => ({
      menuOpen: !state.menuOpen,
    }))
  },
})
const useMainStore = create(persist(devtools(mainStore)))

export default useMainStore
