# Fast Lane Price Reader

A lightweight, Siri-accessible API for fetching and reading Israel Fast Lane toll prices aloud. This solution provides a minimal-footprint approach that works globally without requiring a full native mobile app.

## 🎯 Features

- **Siri Integration**: Ask Siri for current toll prices with voice commands
- **Global Access**: HTTPS endpoint accessible from any network
- **Lightweight**: Stateless API with no user accounts required  
- **Speech-Optimized**: Returns formatted text perfect for voice synthesis
- **Cost-Effective**: Designed for free-tier hosting platforms

## 🚀 Quick Start

### 1. Deploy the API

**Option A: Vercel (Recommended)**
```bash
# Clone the repository
git clone <repository-url>
cd fastlane-price-reader

# Install dependencies
npm install

# Deploy to Vercel
npx vercel

# Set custom domain in Vercel dashboard (optional)
```

**Option B: Netlify**
```bash
# Push to GitHub repository
# Connect repository to Netlify dashboard
# Netlify will auto-deploy using netlify.toml config
```

### 2. Set Up Siri Shortcut

1. Open **Shortcuts app** on iOS
2. Create new shortcut with these actions:
   - **Get Contents of URL**: `https://your-domain.vercel.app/api/price`
   - **Get Dictionary from Input**
   - **Get Dictionary Value**: Get "speech_text"
   - **Speak Text**: Use output from previous step
3. Name the shortcut: "Fast Lane Price"
4. **Add to Siri** with phrase: "What's the Fast Lane price?"

### 3. Test

Say to Siri: *"Hey Siri, what's the Fast Lane price?"*

## 📡 API Endpoints

### `GET /api/price`
Returns current toll price with speech-optimized text.

**Response:**
```json
{
  "price": 15.50,
  "currency": "ILS", 
  "speech_text": "The current Fast Lane toll price is 15.50 Israeli Shekels",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "route": "Highway 6 - Fast Lane"
}
```

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Configuration

### Environment Variables

Create `.env` file (optional):
```env
PORT=3000
FASTLANE_API_URL=https://api.fastlane.co.il/price
NODE_ENV=production
```

### Real Data Source Integration

The API is configured to fetch live data from Fast Lane's official endpoint:
- **Endpoint**: `https://fastlane.co.il/PageMethodsService.asmx/GetCurrentPrice`
- **Method**: POST with specific headers for Israeli mobile compatibility
- **Fallback**: Mock data in development if API is unreachable

**Response format** from Fast Lane API:
```json
{
  "d": "{\"Price\":\"8\",\"PriceDateTime\":\"\\/Date(1755166557603)\\/\",\"PriceDateStr\":\"יום ה\\u0027, 14 אוגוסט 2025\",\"PriceTimeStr\":\"13:15\"}"
}
```

**Processed API response**:
```json
{
  "price": 8.0,
  "currency": "ILS",
  "speech_text": "The current Fast Lane toll price is 8 Israeli Shekels",
  "timestamp": "2025-08-14T13:15:57.603Z",
  "route": "Highway 6 - Fast Lane"
}
```

## 📱 Siri Shortcut Setup

Detailed setup instructions are available in [`siri-shortcut-setup.md`](./siri-shortcut-setup.md).

### Suggested Voice Phrases:
- "What's the Fast Lane price?"
- "Get Fast Lane toll price" 
- "Check Highway 6 price"
- "Fast Lane cost"

## 🌐 Deployment Options

Detailed deployment guide available in [`deployment-options.md`](./deployment-options.md).

### Recommended: Vercel
- **Free tier**: 100GB bandwidth/month
- **Global CDN**: Automatic HTTPS and edge locations
- **Custom domains**: Free SSL certificates
- **Zero configuration**: Git-based deployment

### Alternative Options:
- **Netlify**: 125K function calls/month free
- **Railway**: $5/month always-on service
- **AWS Lambda**: Pay-per-use pricing

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test locally
curl http://localhost:3000/api/price
```

## 📊 Monitoring

### Free Monitoring Options:
- **Vercel Analytics**: Built-in request monitoring
- **UptimeRobot**: Uptime monitoring and alerts
- **Netlify Analytics**: Function execution metrics

### Setting Up Alerts:
1. Create UptimeRobot account
2. Add monitor for your domain
3. Set up email/SMS notifications for downtime

## 🔒 Security

- **HTTPS Only**: All platforms provide free SSL certificates
- **CORS Enabled**: Allows cross-origin requests for Siri
- **No Authentication**: Stateless design for simplicity
- **Rate Limiting**: Optional - can be added if needed

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ❓ Troubleshooting

### Common Issues:

**Siri doesn't trigger shortcut:**
- Re-record the voice phrase more clearly
- Check Siri & Search permissions for Shortcuts app

**API returns error:**
- Verify domain has valid HTTPS certificate
- Check network connectivity
- Test endpoint manually in browser

**No voice response:**
- Ensure "Wait Until Finished" is ON in Speak Text action
- Check device volume and audio settings

### Support

For issues and feature requests, please open an issue in the repository.

## 📈 Future Enhancements

- **Multiple Routes**: Support for different toll roads
- **Price History**: Track and announce price changes
- **Location Awareness**: Auto-trigger based on GPS location
- **Multi-language**: Hebrew and English voice responses
- **Price Alerts**: Notifications when prices change