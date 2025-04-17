/**
 * Half vertical view template for prayer times
 */
export const halfVerticalTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Half View Markup -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--half_vertical">
      <div class="layout padding--small">
        <!-- Header with Last Sync Time -->
        <div class="flex flex--between flex--align-center margin-bottom--small">
          <div class="flex flex--col">
            <span class="title title--medium">Salah Times</span>
            <span class="description description--small">{{ IDX_0.data.meta.timezone }}</span>
          </div>
          <div class="flex flex--col flex--align-end gap--xxsmall">
            <span class="value value--medium value--tnums format-value">{{ IDX_0.enhancedData.currentTime }}</span>
            <span class="description description--small">Last Synced</span>
          </div>
        </div>

        <!-- Next Prayer Information -->
        <div class="item background--dark border radius margin-bottom--small">
          <div class="content padding--small">
            <div class="flex flex--col flex--align-center gap--xxsmall">
              <span class="label label--small">Next Prayer</span>
              <span class="value value--medium fit-value" data-min-size="16" data-max-size="24">{{ IDX_0.enhancedData.nextPrayer }}</span>
              <div class="flex flex--align-center gap--xsmall">
                <span class="value value--small format-value">{{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}</span>
                <span class="description description--small">h</span>
                <span class="value value--small format-value">{{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}</span>
                <span class="description description--small">m</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Prayer Times List -->
        <div class="flex flex--col gap--small overflow overflow--fade">
          <!-- Fajr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--small">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col">
                  <span class="label label--small">Fajr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}
                    <span class="description description--small">Current</span>
                  {% elsif IDX_0.enhancedData.nextPrayer == 'Fajr' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums format-value">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Dhuhr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--small">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col">
                  <span class="label label--small">Dhuhr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}
                    <span class="description description--small">Current</span>
                  {% elsif IDX_0.enhancedData.nextPrayer == 'Dhuhr' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums format-value">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Asr -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--small">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col">
                  <span class="label label--small">Asr</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}
                    <span class="description description--small">Current</span>
                  {% elsif IDX_0.enhancedData.nextPrayer == 'Asr' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums format-value">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Maghrib -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--small">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col">
                  <span class="label label--small">Maghrib</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}
                    <span class="description description--small">Current</span>
                  {% elsif IDX_0.enhancedData.nextPrayer == 'Maghrib' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums format-value">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Isha -->
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--small">
              <div class="flex flex--between flex--align-center">
                <div class="flex flex--col">
                  <span class="label label--small">Isha</span>
                  {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}
                    <span class="description description--small">Current</span>
                  {% elsif IDX_0.enhancedData.nextPrayer == 'Isha' %}
                    <span class="description description--small">Next</span>
                  {% endif %}
                </div>
                <span class="value value--medium value--tnums format-value">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Title Bar -->
      <div class="title_bar">
        <img class="image" src="https://usetrmnl.com/images/plugins/private_plugin.svg" />
        <span class="title">Salah Times</span>
      </div>
    </div>
  </div>
</div>`;
