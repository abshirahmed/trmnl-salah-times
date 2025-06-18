import { Tables } from '@/clients/supabase/database.types';

type UserSettings = Tables<'user_settings'>;

/**
 * Generate HTML for the management interface
 * @param uuid User UUID
 * @param userSettings User settings
 * @returns HTML for the management interface
 */
export const generateManagementInterface = (
  uuid: string,
  userSettings: UserSettings | null,
) => {
  const apiUrlPrefix =
    process.env.STAGE !== 'dev' ? `/${process.env.STAGE}` : '';

  return `
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
        .alert {
          padding: 10px 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          display: none;
        }
        .alert-success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .alert-error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      </style>
    </head>
    <body>
      <h1>Salah Times Settings</h1>

      <div id="success-alert" class="alert alert-success">Settings saved successfully!</div>
      <div id="error-alert" class="alert alert-error">Failed to save settings. Please try again.</div>

      <form id="settings-form">
        <input type="hidden" id="uuid" name="uuid" value="${uuid}">

        <div class="form-group">
          <label for="city">City</label>
          <input type="text" id="city" name="city" placeholder="Enter your city" value="${userSettings?.city || ''}" required>
        </div>

        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" id="country" name="country" placeholder="Enter your country" value="${userSettings?.country || ''}" required>
        </div>

        <div class="form-group">
          <label for="method">Calculation Method</label>
          <select id="method" name="method">
            <option value="2" ${!userSettings || userSettings?.method === 2 ? 'selected' : ''}>Islamic Society of North America (ISNA)</option>
            <option value="1" ${userSettings?.method === 1 ? 'selected' : ''}>University of Islamic Sciences, Karachi</option>
            <option value="3" ${userSettings?.method === 3 ? 'selected' : ''}>Muslim World League</option>
            <option value="4" ${userSettings?.method === 4 ? 'selected' : ''}>Umm Al-Qura University, Makkah</option>
            <option value="5" ${userSettings?.method === 5 ? 'selected' : ''}>Egyptian General Authority of Survey</option>
            <option value="7" ${userSettings?.method === 7 ? 'selected' : ''}>Institute of Geophysics, University of Tehran</option>
            <option value="8" ${userSettings?.method === 8 ? 'selected' : ''}>Gulf Region</option>
            <option value="9" ${userSettings?.method === 9 ? 'selected' : ''}>Kuwait</option>
            <option value="10" ${userSettings?.method === 10 ? 'selected' : ''}>Qatar</option>
            <option value="11" ${userSettings?.method === 11 ? 'selected' : ''}>Majlis Ugama Islam Singapura, Singapore</option>
            <option value="12" ${userSettings?.method === 12 ? 'selected' : ''}>Union Organization Islamic de France</option>
            <option value="13" ${userSettings?.method === 13 ? 'selected' : ''}>Diyanet İşleri Başkanlığı, Turkey</option>
            <option value="14" ${userSettings?.method === 14 ? 'selected' : ''}>Spiritual Administration of Muslims of Russia</option>
            <option value="15" ${userSettings?.method === 15 ? 'selected' : ''}>Moonsighting Committee Worldwide</option>
          </select>
        </div>

        <div class="form-group">
          <label for="time-format">Time Format</label>
          <select id="time-format" name="timeFormat">
            <option value="12h" ${!userSettings || userSettings?.timeformat === '12h' ? 'selected' : ''}>12-hour</option>
            <option value="24h" ${userSettings?.timeformat === '24h' ? 'selected' : ''}>24-hour</option>
          </select>
        </div>

        <div class="form-group">
          <label for="asr-method">Asr Method</label>
          <select id="asr-method" name="asrMethod">
            <option value="0" ${Number(userSettings?.asr_method) === 0 ? 'selected' : ''}>Standard (Shafi'i, Maliki, Hanbali)</option>
            <option value="1" ${Number(userSettings?.asr_method) === 1 ? 'selected' : ''}>Hanafi</option>
          </select>
        </div>

        <div class="form-group">
          <label for="maghrib-offset">Maghrib Offset (minutes)</label>
          <input type="number" id="maghrib-offset" name="maghribOffset" placeholder="e.g. 3 or -2" value="${typeof userSettings?.maghrib_offset === 'number' ? userSettings.maghrib_offset : 0}" required>
        </div>

        <button type="submit">Save Settings</button>
      </form>

      <script>
        const apiUrlPrefix = '${apiUrlPrefix}';

        document.getElementById('settings-form').addEventListener('submit', function(e) {
          e.preventDefault();

          // Hide any previous alerts
          document.getElementById('success-alert').style.display = 'none';
          document.getElementById('error-alert').style.display = 'none';

          const uuid = document.getElementById('uuid').value;
          const city = document.getElementById('city').value;
          const country = document.getElementById('country').value;
          const method = document.getElementById('method').value;
          const timeFormat = document.getElementById('time-format').value;
          const asrMethod = Number(document.getElementById('asr-method').value);
          const maghribOffset = document.getElementById('maghrib-offset').value;

          // Build query string for GET request
          const queryParams = new URLSearchParams({
            uuid,
            city,
            country,
            method,
            timeFormat,
            asrMethod: asrMethod.toString(),
            maghribOffset,
          }).toString();

          // Send settings to the server using GET
          fetch(apiUrlPrefix + '/save-settings?' + queryParams)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to save settings');
              }
              return response.json();
            })
            .then(data => {
              if (data.success) {
                // Show success message
                document.getElementById('success-alert').style.display = 'block';

                // Close the management interface after a short delay
                setTimeout(() => {
                  window.close()
                }, 1500);
              } else {
                // Show error message
                document.getElementById('error-alert').textContent = data.message || 'Failed to save settings. Please try again.';
                document.getElementById('error-alert').style.display = 'block';
              }
            })
            .catch(error => {
              console.error('Error saving settings:', error);
              document.getElementById('error-alert').textContent = 'Failed to save settings. Please try again.';
              document.getElementById('error-alert').style.display = 'block';
            });
        });
      </script>
    </body>
    </html>
    `;
};
