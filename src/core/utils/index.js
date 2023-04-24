const production = process.env.NODE_ENV === 'production'

export const SITE_URL = production ? 'prod-url' : 'http://localhost:3000'