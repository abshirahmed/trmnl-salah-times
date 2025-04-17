/**
 * Template constants for the TRMNL Salah Times plugin
 * This file contains all template strings and identifiers used in the application
 */

// Template identifiers for testing
export const TEMPLATE_IDENTIFIERS = {
  FULL_TEMPLATE_COMMENT:
    '<!-- TRMNL Salah Prayer Times Plugin Markup - Optimized for TRMNL framework -->',
  HALF_VERTICAL_TEMPLATE_COMMENT:
    '<!-- TRMNL Salah Prayer Times Plugin - Half View Markup -->',
  HALF_HORIZONTAL_TEMPLATE_COMMENT:
    '<!-- TRMNL Salah Prayer Times Plugin - Half Horizontal View Markup -->',
  QUADRANT_TEMPLATE_COMMENT:
    '<!-- TRMNL Salah Prayer Times Plugin - Quadrant View Markup -->',
};

// Error templates
export const ERROR_TEMPLATES = {
  FULL: '<div class="view view--full"><div class="layout"><div class="columns"><div class="column"><div class="error">Unable to load prayer times. Please try again later.</div></div></div></div></div>',
  HALF_HORIZONTAL:
    '<div class="view view--half_horizontal"><div class="error">Unable to load prayer times.</div></div>',
  HALF_VERTICAL:
    '<div class="view view--half_vertical"><div class="error">Unable to load prayer times.</div></div>',
  QUADRANT:
    '<div class="view view--quadrant"><div class="error">Error</div></div>',
};

// Full view template
const fullTemplate = `${TEMPLATE_IDENTIFIERS.FULL_TEMPLATE_COMMENT}
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

// Half vertical view template
const halfVerticalTemplate = `${TEMPLATE_IDENTIFIERS.HALF_VERTICAL_TEMPLATE_COMMENT}
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--half_vertical">
      <div class="layout layout--col gap--small">
        <!-- Header Section -->
        <div class="title title--medium mb--xsmall">Salah Times</div>

        <!-- Prayer Times Section - Compact Layout -->
        <div class="grid grid--cols-1 gap--xsmall">
          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Fajr' or IDX_0.enhancedData.nextPrayer == 'Fajr (Tomorrow)' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label label--small no-shrink">Fajr</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Dhuhr' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label label--small no-shrink">Dhuhr</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Asr' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label label--small no-shrink">Asr</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Maghrib' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label label--small no-shrink">Maghrib</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Isha' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--between flex--center-y">
                <span class="label label--small no-shrink">Isha</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Prayer Information - Compact -->
        <div class="layout layout--center">
          <div class="item bg--gray-6">
            <div class="content">
              <div class="flex flex--col">
                <span class="label label--small label--highlight text--center">Next: {{ IDX_0.enhancedData.nextPrayer }}</span>
                <span class="label label--small text--center text--gray-2">In {{ IDX_0.enhancedData.timeUntilNextPrayer.hours }}h {{ IDX_0.enhancedData.timeUntilNextPrayer.minutes }}m</span>
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

// Half horizontal view template
const halfHorizontalTemplate = `${TEMPLATE_IDENTIFIERS.HALF_HORIZONTAL_TEMPLATE_COMMENT}
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--half_horizontal">
      <div class="layout layout--col gap--small">
        <!-- Header Section -->
        <div class="title title--medium mb--xsmall">Salah Times</div>

        <!-- Prayer Times Section - Horizontal Layout -->
        <div class="grid grid--cols-3 gap--xsmall">
          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Fajr' or IDX_0.enhancedData.nextPrayer == 'Fajr (Tomorrow)' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--col flex--center">
                <span class="label label--small no-shrink">Fajr</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Dhuhr' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--col flex--center">
                <span class="label label--small no-shrink">Dhuhr</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Asr' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--col flex--center">
                <span class="label label--small no-shrink">Asr</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Maghrib' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--col flex--center">
                <span class="label label--small no-shrink">Maghrib</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <div class="item {% if IDX_0.enhancedData.nextPrayer == 'Isha' %}item--highlight{% else %}bg--gray-7{% endif %}">
            <div class="content">
              <div class="flex flex--col flex--center">
                <span class="label label--small no-shrink">Isha</span>
                <span class="value value--medium value--tnums">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
              </div>
            </div>
          </div>

          <!-- Next Prayer Information -->
          <div class="item bg--gray-6">
            <div class="content">
              <div class="flex flex--col flex--center">
                <span class="label label--small label--highlight">Next</span>
                <span class="value value--small">{{ IDX_0.enhancedData.nextPrayer }}</span>
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

// Quadrant view template
const quadrantTemplate = `${TEMPLATE_IDENTIFIERS.QUADRANT_TEMPLATE_COMMENT}
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

// Export templates as an object
export const TEMPLATES = {
  full: fullTemplate,
  halfVertical: halfVerticalTemplate,
  halfHorizontal: halfHorizontalTemplate,
  quadrant: quadrantTemplate,
};
