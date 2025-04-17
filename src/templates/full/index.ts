/**
 * Full view template for prayer times
 */
export const fullTemplate = `
<!-- TRMNL Salah Prayer Times Plugin Markup - Optimized for TRMNL framework -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--full">
      <div class="layout padding">
        <!-- Header Section with Last Sync Time -->
        <div class="flex flex--col flex--align-center gap--small margin-bottom">
          <div class="title title--large">Salah Times</div>
          <div class="flex flex--col flex--align-center gap--xxsmall">
            <div class="value value--xlarge value--tnums format-value">{{ IDX_0.enhancedData.currentTime }}</div>
            <div class="description description--small text--center">Last Synced</div>
          </div>
          <div class="label text--center">{{ IDX_0.data.meta.timezone }}</div>
        </div>

        <!-- Next Prayer Information - Prominent Display -->
        <div class="item background--dark border radius margin-bottom">
          <div class="content padding">
            <div class="flex flex--col flex--align-center gap--small">
              <span class="label label--large">Next Prayer</span>
              <span class="title title--large fit-value" data-min-size="24" data-max-size="48">{{ IDX_0.enhancedData.nextPrayer }}</span>
              <div class="flex flex--align-center gap">
                <span class="value value--large format-value">{{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}</span>
                <span class="description">hours</span>
                <span class="value value--large format-value">{{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}</span>
                <span class="description">minutes</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Prayer Times Section -->
        <div class="flex flex--col gap">
          <!-- Fajr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--xsmall">
                  <span class="label">Fajr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}
                    <span class="description">Current Prayer</span>
                  {% endif %}
                </div>
                <div class="flex flex--col flex--align-end">
                  <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
                  {% if IDX_0.enhancedData.nextPrayer == 'Fajr' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
              </div>
            </div>
          </div>

          <!-- Dhuhr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--xsmall">
                  <span class="label">Dhuhr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}
                    <span class="description">Current Prayer</span>
                  {% endif %}
                </div>
                <div class="flex flex--col flex--align-end">
                  <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
                  {% if IDX_0.enhancedData.nextPrayer == 'Dhuhr' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
              </div>
            </div>
          </div>

          <!-- Asr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--xsmall">
                  <span class="label">Asr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}
                    <span class="description">Current Prayer</span>
                  {% endif %}
                </div>
                <div class="flex flex--col flex--align-end">
                  <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
                  {% if IDX_0.enhancedData.nextPrayer == 'Asr' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
              </div>
            </div>
          </div>

          <!-- Maghrib -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--xsmall">
                  <span class="label">Maghrib</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}
                    <span class="description">Current Prayer</span>
                  {% endif %}
                </div>
                <div class="flex flex--col flex--align-end">
                  <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
                  {% if IDX_0.enhancedData.nextPrayer == 'Maghrib' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
              </div>
            </div>
          </div>

          <!-- Isha -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col gap--xsmall">
                  <span class="label">Isha</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}
                    <span class="description">Current Prayer</span>
                  {% endif %}
                </div>
                <div class="flex flex--col flex--align-end">
                  <span class="value value--large value--tnums format-value">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
                  {% if IDX_0.enhancedData.nextPrayer == 'Isha' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hijri Date Section -->
        <div class="item background--light border radius margin-top">
          <div class="content padding">
            <div class="flex flex--col flex--align-center gap--xsmall">
              <span class="label">Islamic Date</span>
              <span class="value fit-value" data-min-size="16" data-max-size="24">{{ IDX_0.enhancedData.hijriDateFormatted }}</span>
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
