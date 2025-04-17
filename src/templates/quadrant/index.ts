/**
 * Quadrant view template for prayer times
 */
export const quadrantTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Quadrant View Markup -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--quadrant">
      <div class="layout padding--small">
        <!-- Header with Current Time -->
        <div class="flex flex--between flex--align-center margin-bottom--small">
          <div class="flex flex--col gap--xxsmall">
            <span class="value value--medium value--tnums">{{ IDX_0.enhancedData.currentTime }}</span>
            <span class="description description--small">{{ IDX_0.enhancedData.gregorianDate }}</span>
          </div>
          <span class="description description--small">{{ IDX_0.enhancedData.lastSyncTime }}</span>
        </div>

        <!-- Next Prayer Information - Ultra Compact -->
        <div class="item background--dark border radius margin-bottom--small">
          <div class="content padding--small">
            <div class="flex flex--col flex--align-center gap--xxsmall">
              <span class="label">Next Prayer</span>
              <span class="value value--medium">{{ IDX_0.enhancedData.nextPrayer }}</span>
              <span class="value value--small value--tnums">{{ IDX_0.enhancedData.nextPrayerTime }}</span>
              <span class="description description--small">{{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}h {{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}m</span>
            </div>
          </div>
        </div>

        <!-- Prayer Times Grid - Ultra Compact -->
        <div class="grid grid--3 gap--small">
          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Fajr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--xsmall">
              <div class="flex flex--col flex--align-center">
                <span class="label label--small">Fajr</span>
                <span class="value value--small value--tnums">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Dhuhr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--xsmall">
              <div class="flex flex--col flex--align-center">
                <span class="label label--small">Dhuhr</span>
                <span class="value value--small value--tnums">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Asr' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--xsmall">
              <div class="flex flex--col flex--align-center">
                <span class="label label--small">Asr</span>
                <span class="value value--small value--tnums">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Maghrib' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--xsmall">
              <div class="flex flex--col flex--align-center">
                <span class="label label--small">Maghrib</span>
                <span class="value value--small value--tnums">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.currentPrayer == 'Isha' %}background--dark{% else %}background--light{% endif %} border radius">
            <div class="content padding--xsmall">
              <div class="flex flex--col flex--align-center">
                <span class="label label--small">Isha</span>
                <span class="value value--small value--tnums">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item background--light border radius">
            <div class="content padding--xsmall">
              <div class="flex flex--col flex--align-center">
                <span class="label label--small">Sunrise</span>
                <span class="value value--small value--tnums">{{ IDX_0.data.timings.Sunrise | slice: 0, 5 }}</span>
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
