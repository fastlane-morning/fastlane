# Siri Shortcut Setup for Fast Lane Price Reader

## Creating the Siri Shortcut

### Method 1: Using Shortcuts App (Recommended)

1. **Open the Shortcuts app** on your iPhone/iPad
2. **Tap the "+" button** to create a new shortcut
3. **Add actions in this order:**

#### Step 1: Get Contents of URL
- Search for and add "Get Contents of URL"
- Set URL to: `https://your-domain.vercel.app/api/price`
- Method: GET
- Headers: (leave default)

#### Step 2: Get Dictionary from Input
- Search for and add "Get Dictionary from Input"
- This will parse the JSON response

#### Step 3: Get Dictionary Value
- Search for and add "Get Dictionary Value"
- Get: Value for "speech_text" in the dictionary from previous step

#### Step 4: Speak Text
- Search for and add "Speak Text"
- Text: Use the output from previous step
- Language: Hebrew or English (your preference)
- Rate: Normal
- Pitch: Normal
- Wait Until Finished: ON

### Step 5: Configure Shortcut Settings
1. **Tap the shortcut name** at the top to rename it
2. **Name it**: "Fast Lane Price" (or similar memorable phrase)
3. **Add to Siri**: Tap "Add to Siri"
4. **Record phrase**: Say "What's the Fast Lane price?" or "Fast Lane toll price"
5. **Test the phrase** - Siri will show you what it heard
6. **Save** the shortcut

## Alternative Siri Phrases
- "Get Fast Lane price"
- "Check toll price"
- "Highway 6 price"
- "Fast Lane cost"

## Testing the Shortcut

1. **Test via Shortcuts app**: Tap the play button on your shortcut
2. **Test via Siri**: Say your recorded phrase to Siri
3. **Verify response**: Should hear the current price spoken aloud

## Troubleshooting

### Common Issues:
- **Network timeout**: Increase timeout in "Get Contents of URL" to 30 seconds
- **SSL/HTTPS errors**: Ensure your domain has valid SSL certificate
- **No speech output**: Check that "Wait Until Finished" is ON in Speak Text action
- **Siri doesn't recognize phrase**: Re-record with clearer pronunciation

### Backup Configuration (Manual JSON parsing):
If the automatic dictionary parsing fails, you can manually extract the price:

1. After "Get Contents of URL", add "Get Text from Input"
2. Add "Match Text" action with regex: `"price":\s*([0-9.]+)`
3. Add "Speak Text" with: "The Fast Lane price is [Matches] Israeli Shekels"

## Privacy & Permissions

- **Network Access**: Shortcut needs internet access to fetch price data
- **Siri Access**: Shortcut needs Siri integration permission
- **No personal data**: This shortcut doesn't store or transmit personal information

## Advanced Features

### Adding Price History
To track price changes, you can modify the shortcut to:
1. Save current price to a note or file
2. Compare with previous price
3. Announce if price has changed

### Location-Based Triggers
You can set up automation to:
1. Automatically check price when approaching toll areas
2. Use GPS location as a trigger
3. Send notifications instead of/in addition to speech