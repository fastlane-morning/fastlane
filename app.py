from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/price', methods=['GET'])
def get_fast_lane_price():
    try:
        url = 'https://fastlane.co.il'
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        price_element = soup.find('div', class_='price')  # Update this selector if needed
        price_text = price_element.get_text(strip=True) if price_element else 'Unavailable'

        return jsonify({'price': price_text})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
