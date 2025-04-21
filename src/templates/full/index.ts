/**
 * Full view template for prayer times
 */
export const fullTemplate = `
<!-- TRMNL Salah Prayer Times Plugin Markup - Optimized for TRMNL framework -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--full">
      <!-- Main Layout -->
      <div class="layout layout--col">
        <!-- Gregorian and Hijri Dates -->
        <div class="stretch-x grid grid-col-2">
          <div class="row row--start">
            <div>
              <span class="title">Gregorian Date</span>
              <span class="value value--xxsmall">{{ IDX_0.enhancedData.gregorianDate }}</span>
           </div>
          </div>
          <div class="row row--end">
            <div>
              <span class="title">Hijri Date</span>
              <span class="value value--xxsmall">{{ IDX_0.enhancedData.hijriDateFormatted }}</span>
            </div>
          </div>
        </div>
        <!-- Next Prayer Info -->
        <div class="stretch-x grid  bg--gray-6">
          <div class="col pt--2 pl--1">
            <div>
              <span class="title title--small">Next</span>
            </div>
            <div class="grid grid-col-2">
              <div class="row start">
                <span class="value">{{ IDX_0.enhancedData.nextPrayer | upcase }}</span>
              </div>
            <div class="row row--end">
                <span class="value">{{ IDX_0.enhancedData.nextPrayerTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Prayer Times -->
        <div class="stretch-x stretch-y">
          <table class="table">
            <thead>
              <tr>
                <th class="text--left"><span class="label">Prayer</span></th>
                <th class="text--right"><span class="label">Time</span></th>
              </tr>
            </thead>
            <tbody>
              {% assign prayers = "Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha" | split: "," %}
              {% for prayer in prayers %}
              <tr>
                <td><span class="title">{{ prayer }}</span></td>
                <td class="text--right"><span class="title">{{ IDX_0.data.timings[prayer] | slice: 0, 5 }}</span></td>
              </tr>
              {% endfor %}
            </tbody>
          </table>
        </div>
        <!-- Metadata in 1 row -->
        <div class="stretch-x">
        <div class="flex gap--space-between w-full">
            <!-- Calculation Method -->
              <span class="description">Calculation Method: {{ IDX_0.data.meta.method.name }}</span>
            <!-- Last Sync -->
            <span class="description">Last Sync: {{ IDX_0.enhancedData.lastSyncTime }}</span>
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
