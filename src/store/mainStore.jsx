import { showNotification } from "@mantine/notifications";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { supabase } from "../utils/supabaseClient";

const mainStore = (set, get) => ({
  menuOpen: false,
  isDesktop: true,
  user: null,
  role: null,
  shopName: null,

  /* AUTH FUNCTION */
  useAuth() {
    const { data, error } = supabase.auth.getSession();
    set(() => ({
      user: data,
    }));
    return data;
  },

  async handleLogOut() {
    let { error } = await supabase.auth.signOut();
    set(() => ({
      user: null,
      role: null,
      shopName: null,
    }));
  },

  async setUserData(session) {
    if (session === null) {
      get().handleLogOut;
      return;
    }

    const userId = session.user.id;

    const role = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId);

    if (role.data[0].role === "owner") {
      const shop = await supabase
        .from("shops")
        .select("shop_id")
        .eq("id", userId);

      set(() => ({
        user: userId,
        role: role.data[0].role,
        shopName: shop.data[0].shop_id,
      }));
    } else {
      set(() => ({
        user: userId,
        role: role.data[0].role,
        shopName: null,
      }));
    }
  },

  async refreshUserData() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      get().setUserData(session);
    });
  },

  /* FETCH FUNCTIONS */

  async fetchShopByID(shop_id) {
    const shop = await supabase
      .from("shops")
      .select("*")
      .eq("shop_id", shop_id)
      .single();

    return shop;
  },

  async fetchShopByName(shop_name) {
    const shop = await supabase
      .from("shops")
      .select("*")
      .eq("shop_name", shop_name)
      .single();

    return shop;
  },

  async fetchPopularShops() {
    const shop = await supabase.from("shops").select("*");

    return shop;
  },

  async fetchProductByID(product_id) {
    const shop = await supabase
      .from("products")
      .select("*")
      .eq("product_id", product_id)
      .single();

    return shop;
  },

  async fetchProductsByShopID(shop_id) {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("shop_id", shop_id);

    return data;
  },

  /* UI FUNCTION */

  onResize: () => {
    document
      .querySelector(":root")
      .style.setProperty("--vh", window.innerHeight / 100 + "px");

    set(() => ({
      isDesktop: window.innerWidth > 800,
    }));
  },

  handleMenuToggle: () => {
    set((state) => ({
      menuOpen: !state.menuOpen,
    }));
  },
});
const useMainStore = create(persist(devtools(mainStore)));

export default useMainStore;
