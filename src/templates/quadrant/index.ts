/**
 * Quadrant view template for prayer times
 */
export const quadrantTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Quadrant View Markup -->
<div class="environment trmnl">
  <div class="screen">
    <div class="view view--quadrant">
      <div class="layout layout--col">
        <!-- Gregorian and Hijri Dates -->
        <div class="stretch-x flex gap--space-between">
          <p class="text">{{ IDX_0.enhancedData.gregorianDate }}</p>
          <p class="text">{{ IDX_0.enhancedData.hijriDateFormatted }}</p>
        </div>
        <!-- Next Prayer Info -->
        <div class="stretch-x bg--gray-6 p--1">
          <p class="title title--small">Next</p>
          <div class="flex gap--space-between w-full">
            <p class="value value--small">{{ IDX_0.enhancedData.nextPrayer | upcase }}</p>
            <p class="value value--small">{{ IDX_0.enhancedData.nextPrayerTime }}</p>
          </div>
        </div>
        <!-- Prayer Times -->
          <div class="grid grid--cols-2 gap--medium stretch-x">
          {% assign prayers = "Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha" | split: "," %}
          <!-- Left Column -->
          <div class="flex flex--col gap--medium stretch-x">
            {% for prayer in prayers limit: 3 %}
              <div class="flex gap--space-between border--h-4 stretch-x">
                <p class="label">{{ prayer }}</p>
                <p class="label text--right">{{ IDX_0.data.timings[prayer] | slice: 0, 5 }}</p>
              </div>
            {% endfor %}
          </div>
          <!-- Right Column -->
          <div class="flex flex--col gap--medium stretch-x">
            {% for prayer in prayers offset: 3 limit: 3 %}
              <div class="flex gap--space-between border--h-4 stretch-x">
                <p class="label">{{ prayer }}</p>
                <p class="label text--right">{{ IDX_0.data.timings[prayer] | slice: 0, 5 }}</p>
              </div>
            {% endfor %}
          </div>
          </div>
          <!-- Metadata in 1 row -->
        <div class="stretch-x flex gap--space-between">
            <!-- Calculation Method -->
            <p class="description">{{ IDX_0.data.meta.method.name }}</p>
            <!-- Last Sync -->
            <p class="description">Last Sync: {{ IDX_0.enhancedData.lastSyncTime }}</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
