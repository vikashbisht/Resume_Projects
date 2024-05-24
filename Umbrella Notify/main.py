import os
import requests
from twilio.rest import Client

OWM_Endpoint = "https://api.openweathermap.org/data/2.5/forecast"
api_key = "c04759e23a2de787d6fbd602383b032c"
account_sid = "ACf0eea1e7e42dfa6988ea7b012d470ab3"
auth_token = "085559bb924fd56fd941b88bee74530a"

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
        print("It's going to rain today. Remember to bring an ☔")

if will_rain:
    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                        body="It's going to rain today. Remember to bring an ☔",
                        from_='+19543763511',
                        to='+919756345567'
                    )

    print(message.status)


