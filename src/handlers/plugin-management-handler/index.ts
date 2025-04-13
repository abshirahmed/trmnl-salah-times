import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the TRMNL plugin management interface
 * Allows users to configure their prayer times settings
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pluginManagementHandler = async (_event: APIGatewayProxyEvent) => {
  try {
    // Return a simple HTML form for configuring prayer times settings

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Salah Times Settings</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #2c3e50;
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input, select {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #2980b9;
        }
        .form-group {
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <h1>Salah Times Settings</h1>
      <form id="settings-form">
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" id="city" name="city" placeholder="Enter your city" required>
        </div>

        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" id="country" name="country" placeholder="Enter your country" required>
        </div>

        <div class="form-group">
          <label for="method">Calculation Method</label>
          <select id="method" name="method">
            <option value="2">Islamic Society of North America (ISNA)</option>
            <option value="1">University of Islamic Sciences, Karachi</option>
            <option value="3">Muslim World League</option>
            <option value="4">Umm Al-Qura University, Makkah</option>
            <option value="5">Egyptian General Authority of Survey</option>
            <option value="7">Institute of Geophysics, University of Tehran</option>
            <option value="8">Gulf Region</option>
            <option value="9">Kuwait</option>
            <option value="10">Qatar</option>
            <option value="11">Majlis Ugama Islam Singapura, Singapore</option>
            <option value="12">Union Organization Islamic de France</option>
            <option value="13">Diyanet İşleri Başkanlığı, Turkey</option>
            <option value="14">Spiritual Administration of Muslims of Russia</option>
            <option value="15">Moonsighting Committee Worldwide</option>
          </select>
        </div>

        <div class="form-group">
          <label for="time-format">Time Format</label>
          <select id="time-format" name="timeFormat">
            <option value="24h">24-hour</option>
            <option value="12h">12-hour</option>
          </select>
        </div>

        <button type="submit">Save Settings</button>
      </form>

      <script>
        document.getElementById('settings-form').addEventListener('submit', function(e) {
          e.preventDefault();

          const city = document.getElementById('city').value;
          const country = document.getElementById('country').value;
          const method = document.getElementById('method').value;
          const timeFormat = document.getElementById('time-format').value;

          // In a production environment, you would send these settings to your server
          // For now, we'll just show an alert

          alert('Settings saved successfully!');

          // Redirect back to TRMNL
          window.location.href = 'https://usetrmnl.com';
        });
      </script>
    </body>
    </html>
    `;

    return {
      statusCode: HttpStatusCode.Ok,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (error) {
    logger.error('Error serving plugin management interface', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Error serving plugin management interface',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

export const handler = middify(pluginManagementHandler);
