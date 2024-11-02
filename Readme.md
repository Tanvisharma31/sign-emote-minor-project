
# Sign-Emote

Sign-Emote is a web application designed to serve as a real-time interpreter for sign language, facilitating communication for individuals who rely on sign language. This app, built entirely in Angular, leverages the Gemini API to provide users with accurate interpretations and responses to questions about sign languages or learning resources, bridging communication gaps in an accessible and user-friendly way.

## Features

- **Real-Time Sign Language Interpretation:** Converts sign language gestures into text and displays them in real-time.
- **Gemini API Integration:** Provides robust interpretation and contextual understanding of sign language phrases.
- **Interactive Learning Support:** Offers resources and answers to frequently asked questions related to learning and understanding sign language.
- **Angular-Based Architecture:** Fully developed using Angular for efficient front-end performance and user experience.

## Technology Stack

- **Frontend:** Angular
- **Backend:** No backend database is required as data is handled directly through the Gemini API.
- **API:** Gemini API for real-time interpretation and support for sign language.
- **Deployment:** Deployed on Vercel for optimized performance and scalability.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sign-emote.git
   cd sign-emote
   ```

2. **Install dependencies:**
   Make sure you have Node.js and npm installed. Then, install dependencies by running:
   ```bash
   npm install
   ```

3. **Set up API keys:**
   Configure the Gemini API key in your environment (if needed), which may be required in the Angular environment file.

4. **Run the application:**
   Start the app locally:
   ```bash
   ng serve
   ```
   Open [http://localhost:4200](http://localhost:4200) in your browser to view the application.

## Usage

1. **Open the application:** Once running, navigate to the main page where you can start using the interpreter.
2. **Sign Language Interpretation:** Use the webcam or supported device for gesture recognition. Sign-Emote will interpret gestures and display their corresponding text output.
3. **Learning Mode:** Ask questions about sign language directly within the app. Responses will be generated via the Gemini API, offering guidance on sign language phrases or resources.

## API Reference

### Gemini API
The app leverages the Gemini API for sign language interpretation and interaction. Please refer to the [Gemini API documentation](https://geminiapi.docs.url) for further details on usage, endpoints, and available request types.

## Project Structure

```
sign-emote/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   └── main.ts
└── README.md
```

- **Components:** All Angular components used for UI and interactions.
- **Services:** Contains services such as the `chatbot.service.ts` which handles API requests and responses.
- **Pages:** Organized pages for navigation and content display within the app.

## Troubleshooting

### Common Issues
- **Quota Exceeded (429 Error):** This indicates that the app has exceeded the API call limit per minute. Implementing rate limiting or caching solutions can help prevent this.
- **Syntax Errors in `manifest.webmanifest`:** Ensure there are no syntax errors in the manifest file to avoid issues in production deployment.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request if you have any improvements or bug fixes.

## Contact

For questions or suggestions, please contact:
**Tanvi Sharma** - [2004tanvisharma@gmail.com](mailto:2004tanvisharma@gmail.com)  
