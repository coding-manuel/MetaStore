function envHelper(env_name) {
  return import.meta.env[env_name] ?? process.env[env_name] ;
}

export default envHelper;