/**
 * Full view template for prayer times
 */
export const fullTemplate = `
<!-- TRMNL Salah Prayer Times Plugin Markup - Optimized for TRMNL framework -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--full">
      <div class="layout layout--col gap--medium">
        <!-- Header Section -->
        <div class="title title--large mb--small">Salah Times</div>

        <!-- Prayer Times Section - Using proper Item components -->
        <div class="grid grid--cols-1 gap--small">
          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Fajr' or IDX_0.enhancedData.nextPrayer == 'Fajr (Tomorrow)' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="meta"></div>
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label no-shrink">Fajr</span>
                <span class="value value--large value--tnums">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Sunrise' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="meta"></div>
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label no-shrink">Sunrise</span>
                <span class="value value--large value--tnums">{{ IDX_0.data.timings.Sunrise | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Dhuhr' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="meta"></div>
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label no-shrink">Dhuhr</span>
                <span class="value value--large value--tnums">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Asr' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="meta"></div>
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label no-shrink">Asr</span>
                <span class="value value--large value--tnums">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Maghrib' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="meta"></div>
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label no-shrink">Maghrib</span>
                <span class="value value--large value--tnums">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Isha' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="meta"></div>
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label no-shrink">Isha</span>
                <span class="value value--large value--tnums">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Prayer Information -->
        <div class="layout layout--center">
          <div class="item bg--gray-6">
            <div class="content">
              <div class="flex flex--col gap--xsmall">
                <span class="label label--highlight text--center">Next: {{ IDX_0.enhancedData.nextPrayer }}</span>
                <span class="label text--center text--gray-2">In {{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}h {{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}m</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hijri Date Section -->
        <div class="layout layout--center mt--small">
          <div class="item bg--gray-7">
            <div class="content">
              <span class="label label--underline text--center text--gray-1">{{ IDX_0.enhancedData.hijriDateFormatted }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Title Bar -->
      <div class="title_bar">
        <img class="image" src="https://usetrmnl.com/images/plugins/private_plugin.svg" />
        <span class="title">Salah Times</span>
        <span class="instance text--gray-3">{{ IDX_0.data.meta.timezone }}</span>
      </div>
    </div>
  </div>
</div>`;
