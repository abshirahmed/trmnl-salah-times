/**
 * Full view template for prayer times
 */
export const fullTemplate = `
<!-- TRMNL Salah Prayer Times Plugin Markup - Optimized for TRMNL framework -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--full">
      <div class="layout padding--large">
        <!-- Header Section with Current Time and Date -->
        <div class="flex flex--col flex--align-center gap--medium margin-bottom--medium">
          <div class="flex flex--col flex--align-center gap--small">
            <div class="value value--xlarge value--tnums format-value">{{ IDX_0.enhancedData.currentTime }}</div>
            <div class="flex flex--col flex--align-center gap--small">
              <div class="description text--center">{{ IDX_0.enhancedData.gregorianDate }}</div>
              <div class="description description--small text--center">Last Updated: {{ IDX_0.enhancedData.lastSyncTime }}</div>
            </div>
          </div>
        </div>

        <!-- Next Prayer Information - Prominent Display -->
        <div class="item background--dark border radius margin-bottom--large">
          <div class="content padding--large">
            <div class="flex flex--col flex--align-center gap--medium">
              <span class="label label--large">Next Prayer</span>
              <div class="flex flex--col flex--align-center gap--medium">
                <span class="title title--large fit-value" data-min-size="32" data-max-size="48">{{ IDX_0.enhancedData.nextPrayer }}</span>
                <span class="value value--large value--tnums format-value">{{ IDX_0.enhancedData.nextPrayerTime }}</span>
              </div>
              <div class="flex flex--align-center gap--medium">
                <span class="value value--large format-value">{{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}</span>
                <span class="description">hours</span>
                <span class="value value--large format-value">{{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}</span>
                <span class="description">minutes</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Prayer Times Section -->
        <div class="flex flex--col gap--medium">
          <!-- Fajr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label label--large">Fajr Prayer</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Sunrise -->
          <div class="item background--light border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label label--large">Sunrise</span>
                  <span class="description description--small">End of Fajr Time</span>
                </div>
                <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Sunrise | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Dhuhr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label label--large">Dhuhr Prayer</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Asr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label label--large">Asr Prayer</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Maghrib -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label label--large">Maghrib Prayer</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Isha -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--medium">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--small">
                  <span class="label label--large">Isha Prayer</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}
                    <span class="description description--small">Current Prayer</span>
                  {% endif %}
                </div>
                <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information Section -->
        <div class="flex flex--col gap--medium margin-top--medium">
          <!-- Islamic Date -->
          <div class="item background--light border radius">
            <div class="content padding--medium">
              <div class="flex flex--col flex--align-center gap--medium">
                <span class="label">Islamic Date</span>
                <span class="value value--large">{{ IDX_0.data.date.hijri.weekday.en }}, {{ IDX_0.data.date.hijri.day }} {{ IDX_0.data.date.hijri.month.en }} {{ IDX_0.data.date.hijri.year }} {{ IDX_0.data.date.hijri.designation.abbreviated }}</span>
                {% if IDX_0.data.date.hijri.holidays.length > 0 %}
                  <span class="description description--small">{{ IDX_0.data.date.hijri.holidays[0] }}</span>
                {% endif %}
              </div>
            </div>
          </div>

          <!-- Calculation Method -->
          <div class="item background--light border radius">
            <div class="content padding--medium">
              <div class="flex flex--col flex--align-center gap--medium">
                <span class="label">Calculation Method</span>
                <span class="value value--medium">{{ IDX_0.data.meta.method.name }}</span>
                <span class="description description--small">Fajr Angle: {{ IDX_0.data.meta.method.params.Fajr }}° • Isha Angle: {{ IDX_0.data.meta.method.params.Isha }}°</span>
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
