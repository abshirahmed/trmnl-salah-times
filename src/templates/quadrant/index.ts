/**
 * Quadrant view template for prayer times
 */
export const quadrantTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Quadrant View Markup -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--quadrant">
      <div class="layout padding--xsmall">
        <!-- Header with Current Time -->
        <div class="flex flex--between flex--align-center margin-bottom--xsmall">
          <span class="title title--small">Salah</span>
          <span class="value value--small value--tnums">{{ IDX_0.enhancedData.currentTime }}</span>
        </div>

        <!-- Next Prayer Information - Ultra Compact -->
        <div class="item background--dark border radius">
          <div class="content padding--xsmall">
            <div class="flex flex--col flex--align-center gap--xxsmall">
              <span class="label label--small">{{ IDX_0.enhancedData.nextPrayer }}</span>
              <span class="value value--medium value--tnums">{{ IDX_0.enhancedData.nextPrayerTime }}</span>
              <span class="description description--small">{{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}h {{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}m</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Title Bar -->
      <div class="title_bar">
        <img class="image" src="https://usetrmnl.com/images/plugins/private_plugin.svg" />
        <span class="title">Salah</span>
      </div>
    </div>
  </div>
</div>`;
