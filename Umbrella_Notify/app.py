import os
import requests
from twilio.rest import Client
from twilio.http.http_client import TwilioHttpClient

OWM_Endpoint = "https://api.openweathermap.org/data/2.5/forecast"
api_key = os.environ.get("OWM_API_KEY")
account_sid = "ACf0eea1e7e42dfa6988ea7b012d470ab3"
auth_token = os.environ.get("AUTH_TOKEN")

weather_params = {
    "lat": 30.222400,
    "lon": 78.777100,
    "appid": api_key,
    "cnt": 4,
}

response = requests.get(OWM_Endpoint, params=weather_params)
response.raise_for_status()
weather_data = response.json()

will_rain = False

for hour_data in weather_data["list"]:
    condition_code = hour_data["weather"][0]["id"]
    if int(condition_code) < 700:
        will_rain = True

if will_rain:
    proxy_client = TwilioHttpClient()
    proxy_client.session.proxies = {'https' : os.environ['https_proxy']}
    client = Client(account_sid, auth_token, http_client = proxy_client)

    message = client.messages \
                    .create(
                        body="It's going to rain today. Remember to bring an ☔",
                        from_= os.environ.get("TRIAL_NUMBER"),
                        to= os.environ.get("MY_NUMBER")
                    )

    print(message.status)
