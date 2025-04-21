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
        <div class="stretch-x flex gap--space-between">
          <p class="title title--small">{{ IDX_0.enhancedData.gregorianDate }}</p>
          <p class="title title--small">{{ IDX_0.enhancedData.hijriDateFormatted }}</p>
        </div>
        <!-- Next Prayer Info -->
        <div class="stretch-x bg--gray-6 p--1">
          <p class="title title--small">Next</p>
          <div class="flex gap--space-between w-full">
            <p class="value">{{ IDX_0.enhancedData.nextPrayer | upcase }}</p>
            <p class="value">{{ IDX_0.enhancedData.nextPrayerTime }}</p>
          </div>
        </div>
        <!-- Prayer Times -->
        <table class="table table--condensed stretch">
          <thead>
            <tr>
              <th><span class="title title--small">Prayer</span></th>
              <th><span class="title title--small text--right">Time</span></th>
            </tr>
          </thead>
          <tbody>
            {% assign prayers = "Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha" | split: "," %}
            {% for prayer in prayers %}
            <tr>
              <td><span class="label label--large">{{ prayer }}</span></td>
              <td><span class="label label--large text--right">{{ IDX_0.data.timings[prayer] | slice: 0, 5 }}</span></td>
            </tr>
            {% endfor %}
          </tbody>
        </table>
        <!-- Metadata in 1 row -->
        <div class="stretch-x">
        <div class="flex gap--space-between">
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
