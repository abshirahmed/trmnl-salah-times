/**
 * Quadrant view template for prayer times
 */
export const quadrantTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Quadrant View Markup -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--quadrant">
      <div class="layout layout--col gap--xsmall">
        <!-- Header Section -->
        <div class="title title--small mb--xxsmall">Salah Times</div>

        <!-- Next Prayer Information - Ultra Compact -->
        <div class="item bg--gray-6">
          <div class="content">
            <div class="flex flex--col flex--center">
              <span class="label label--small label--highlight text--center">{{ IDX_0.enhancedData.nextPrayer }}</span>
              <span class="value value--medium value--tnums">{{ IDX_0.enhancedData.nextPrayerTime }}</span>
              <span class="label label--small text--center text--gray-2">In {{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}h {{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}m</span>
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
