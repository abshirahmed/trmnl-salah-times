# Local Development Guide for TRMNL Salah Times

This guide explains how to run the TRMNL Salah Times application locally for development purposes, allowing you to see the UI templates and test the application without deploying to AWS.

## Prerequisites

Before you start, make sure you have the following installed:
- Node.js (v20.x or later)
- Yarn package manager (latest version)
- AWS CLI (configured with appropriate credentials)
- Docker (for running Supabase locally - optional)

## Environment Setup

The project uses environment variables for configuration. These are stored in a `.env` file in the project root. Make sure this file exists and contains the following variables:

```
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

# TRMNL Plugin Configuration
TRMNL_CLIENT_ID=your_trmnl_client_id
TRMNL_CLIENT_SECRET=your_trmnl_client_secret

# AWS Configuration (optional for local development)
AWS_PROFILE=your_aws_profile
AWS_REGION=eu-west-2
```

## Running the Application Locally

The project provides several npm scripts for local development:

```bash
# Start the serverless offline server
yarn serverless:offline

# Build and serve the preview UI
yarn preview

# Build preview UI only
yarn preview:build

# Serve preview UI only (after building)
yarn preview:serve
```

The serverless offline server will be available at `http://localhost:3000` and the preview UI at `http://localhost:3001`.

### Authentication in Local Development

When running the application with `serverless:offline`, authentication is automatically skipped to make local development and testing easier. This means you don't need to provide valid authentication tokens when making requests to the API endpoints.

In production, all endpoints that require authentication will validate the Authorization header and reject requests without valid tokens.

## Viewing UI Templates

To view the UI templates during development, you can send a POST request to the `plugin-markup` endpoint. This endpoint is responsible for generating the HTML markup for the TRMNL plugin.

You can use tools like Postman, curl, or any HTTP client to send a POST request to:

```
http://localhost:3000/plugin-markup
```

With a JSON body that includes:

```json
{
  "uuid": "test-user-id",
  "viewSize": "full" // or "half" or "quadrant"
}
```

The response will be the HTML markup for the requested view size, which you can view in a browser to see how the UI looks.

Alternatively, you can create a simple HTML file that loads the markup from the local endpoint:

```html
<!DOCTYPE html>
<html>
<head>
  <title>TRMNL Salah Times Preview</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f0f0f0;
    }
    .trmnl-container {
      width: 800px;
      height: 480px;
      background-color: white;
      border: 1px solid #ccc;
      overflow: hidden;
    }
    .trmnl-container.half {
      width: 400px;
      height: 480px;
    }
    .trmnl-container.quadrant {
      width: 400px;
      height: 240px;
    }
  </style>
</head>
<body>
  <div class="trmnl-container" id="container"></div>

  <script>
    // Function to fetch and display the markup
    async function loadMarkup(viewSize = 'full') {
      const container = document.getElementById('container');
      container.className = `trmnl-container ${viewSize !== 'full' ? viewSize : ''}`;

      try {
        const response = await fetch('http://localhost:3000/plugin-markup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uuid: 'test-user-id',
            viewSize: viewSize
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markup = await response.text();
        container.innerHTML = markup;
      } catch (error) {
        console.error('Error loading markup:', error);
        container.innerHTML = `<p>Error loading markup: ${error.message}</p>`;
      }
    }

    // Load the full view by default
    loadMarkup('full');

    // You can call loadMarkup with 'half' or 'quadrant' to see other view sizes
    // loadMarkup('half');
    // loadMarkup('quadrant');
  </script>
</body>
</html>
```

Save this file as `preview.html` in your project root and open it in a browser after starting the serverless offline server.

### Using the Provided Preview Tool

For your convenience, a ready-to-use preview tool has been created and included in the project. To use it:

1. Start the serverless offline server with `yarn serverless:offline`
2. Open the `preview.html` file in your browser
3. Use the buttons at the top to switch between different view sizes (Full, Half, Quadrant)
4. Click the Refresh button to reload the current view with the latest template changes

This preview tool provides a more user-friendly interface for viewing and testing the UI templates during development.

## Troubleshooting

If you encounter any issues:

1. Make sure all required environment variables are set in the `.env` file
2. Check that the serverless offline server is running without errors
3. Verify that you're sending the correct request format to the plugin-markup endpoint
4. Check the server logs for any error messages

## Additional Resources

- [Serverless Offline Plugin Documentation](https://github.com/dherault/serverless-offline)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
