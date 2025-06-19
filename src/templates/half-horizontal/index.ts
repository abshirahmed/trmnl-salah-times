/**
 * Half horizontal view template for prayer times
 */
export const halfHorizontalTemplate = `
<!-- TRMNL Salah Prayer Times Plugin - Half Horizontal View Markup -->
<div class="environment trmnl">
  <div class="screen screen--no-bleed">
    <div class="view view--half_horizontal">
      <div class="layout layout--col layout--stretch-x">
        <!-- Gregorian and Hijri Dates -->
        <div class="flex gap--space-between">
          <p class="title title--small">{{ IDX_0.enhancedData.gregorianDate }}</p>
          <p class="title title--small">{{ IDX_0.enhancedData.hijriDateFormatted }}</p>
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
          <div class="grid grid--cols-2 gap--medium">
          {% assign prayers = "Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha" | split: "," %}
          <!-- Left Column -->
          <div class="flex flex--col gap--medium">
            {% for prayer in prayers limit: 3 %}
              <div class="flex gap--space-between border--h-4 w--full {% if prayer == IDX_0.enhancedData.currentPrayer %}bg--gray-7{% endif %}">
                <p class="label">{{ prayer }}</p>
                <p class="label text--right">{{ IDX_0.data.formattedTimings[prayer] }}</p>
              </div>
            {% endfor %}
          </div>
          <!-- Right Column -->
          <div class="flex flex--col gap--medium">
            {% for prayer in prayers offset: 3 limit: 3 %}
              <div class="flex gap--space-between border--h-4 w--full {% if prayer == IDX_0.enhancedData.currentPrayer %}bg--gray-7{% endif %}">
                <p class="label">{{ prayer }}</p>
                <p class="label text--right">{{ IDX_0.data.formattedTimings[prayer] }}</p>
              </div>
            {% endfor %}
          </div>
          </div>
        <!-- Metadata in 1 row -->
        <div class="flex gap--space-between">
            <!-- Calculation Method -->
            <span class="description">Method: {{ IDX_0.data.meta.method.name }}</span>
            <!-- Last Sync -->
            <span class="description">Updated: {{ IDX_0.enhancedData.lastSyncTime }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
