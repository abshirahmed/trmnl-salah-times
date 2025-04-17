/**
 * Half horizontal view template for prayer times
 */
export const halfHorizontalTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Half Horizontal View Markup -->
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
