/**
 * Half vertical view template for prayer times
 */
export const halfVerticalTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Half View Markup -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--half_vertical">
      <div class="layout padding--medium">
        <!-- Header Section -->
        <div class="flex flex--between flex--align-center margin-bottom--medium">
          <div class="flex flex--col gap--small">
            <div class="value value--large value--tnums format-value">{{ IDX_0.enhancedData.currentTime }}</div>
            <div class="description text--center">{{ IDX_0.enhancedData.gregorianDate }}</div>
          </div>
          <div class="flex flex--col flex--align-end gap--small">
            <span class="description description--small">Last Updated: {{ IDX_0.enhancedData.lastSyncTime }}</span>
          </div>
        </div>

        <!-- Next Prayer Information -->
        <div class="item background--dark border radius margin-bottom--medium">
          <div class="content padding--medium">
            <div class="flex flex--col flex--align-center gap--medium">
              <span class="label label--large">Next Prayer</span>
              <span class="value value--large">{{ IDX_0.enhancedData.nextPrayer }}</span>
              <span class="value value--medium value--tnums">{{ IDX_0.enhancedData.nextPrayerTime }}</span>
              <span class="description">{{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}h {{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}m</span>
            </div>
          </div>
        </div>

        <!-- Prayer Times List -->
        <div class="flex flex--col gap--medium">
          <!-- Fajr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label">Fajr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Sunrise -->
          <div class="item background--light border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label">Sunrise</span>
                  <span class="description description--small">End of Fajr Time</span>
                </div>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Sunrise | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Dhuhr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label">Dhuhr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Asr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label">Asr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Maghrib -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label">Maghrib</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Isha -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label">Isha</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Title Bar -->
      <div class="title_bar">
        <img class="image" src="https://usetrmnl.com/images/plugins/private_plugin.svg" />
        <span class="title">Salah Times</span>
        <span class="instance">{{ IDX_0.data.meta.timezone }}</span>
      </div>
    </div>
  </div>
</div>`;
