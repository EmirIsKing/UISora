import axios from 'axios'

export const LemonSqueezyEndpoint = "https://api.lemonsqueezy.com/v1/";

export const LemonSqueezyApiInstance = axios.create({
    baseURL: LemonSqueezyEndpoint,
    headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      }
})

