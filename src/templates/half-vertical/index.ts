/**
 * Half vertical view template for prayer times
 */
export const halfVerticalTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Half View Markup -->
<div class="environment trmnl">
  <div class="screen screen--no-bleed">
    <div class="view view--half_vertical">
    <div class="layout layout--col layout--stretch-x">
        <!-- Gregorian and Hijri Dates -->
        <div class="flex gap--space-between">
          <p class="text">{{ IDX_0.enhancedData.gregorianDate }}</p>
          <p class="text">{{ IDX_0.enhancedData.hijriDateFormatted }}</p>
        </div>
        <!-- Next Prayer Info -->
        <div class="bg--gray-6 p--1">
          <p class="title title--small">Next</p>
          <div class="flex gap--space-between w-full">
            <p class="value value--small">{{ IDX_0.enhancedData.nextPrayer | upcase }}</p>
            <p class="value value--small text--right">{{ IDX_0.enhancedData.nextPrayerTime }}</p>
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
            <tr class="{% if prayer == IDX_0.enhancedData.currentPrayer %}bg--gray-7{% endif %}">
              <td><span class="label label--large">{{ prayer }}</span></td>
              <td><span class="label label--large text--right">{{ IDX_0.data.timings[prayer] | slice: 0, 5 }}</span></td>
            </tr>
            {% endfor %}
          </tbody>
        </table>
        <!-- Metadata in 1 row -->
        <div class="flex flex--col flex--left">
            <!-- Calculation Method -->
            <p class="description">Method: {{ IDX_0.data.meta.method.name }}</p>
            <!-- Last Sync -->
            <p class="description">Updated: {{ IDX_0.enhancedData.lastSyncTime }}</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
