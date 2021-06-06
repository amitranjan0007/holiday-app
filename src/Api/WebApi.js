import axios from "axios"
import config from "../config"

export const WebApi = {
  //REWAMPED integrations

getCountryList: () =>
    axios({
      method: "GET",
      url: `${config.API_BASE_URL}${config.FETCH_COUNTRY}`,
    }),

getHolidayList: (payload) =>
    axios({
      method: "POST",
      url: `${config.API_BASE_URL}${config.FETCH_COUNTRY_HOLIDAY}`,
      data: payload,
    }),
}