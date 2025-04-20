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
        <div class="stretch-x grid grid-col-2 border--h-3">
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
        <div class="flex flex--col gap--space-between h-full">
        <!-- Header -->
          <div class="grid grid-col-2 border--h-1">
            <div class="row row--start">
              <span class="label">Prayer</span>
            </div>
            <div class="row row--end">
              <span class="label">Time</span>
            </div>
          </div>
          <!-- Fajr -->
          <div class="grid grid-col-2 border--h-3">
            <div class="row row--start">
              <span class="title">Fajr</span>
            </div>
            <div class="row row--end">
              <span class="title">{{ IDX_0.data.timings.Fajr | slice: 0, 5 }}</span>
            </div>
          </div>
          <!-- Sunrise -->
          <div class="grid grid-col-2 border--h-3">
            <div class="row row--start">
              <span class="title">Sunrise</span>
            </div>
            <div class="row row--end">
              <span class="title">{{ IDX_0.data.timings.Sunrise | slice: 0, 5 }}</span>
            </div>
        </div>
          <!-- Dhuhr -->
          <div class="grid grid-col-2 border--h-3">
            <div class="row row--start">
              <span class="title">Dhuhr</span>
            </div>
            <div class="row row--end">
              <span class="title">{{ IDX_0.data.timings.Dhuhr | slice: 0, 5 }}</span>
            </div>
          </div>
          <!-- Asr -->
          <div class="grid grid-col-2 border--h-3">
            <div class="row row--start">
              <span class="title">Asr</span>
            </div>
            <div class="row row--end">
              <span class="title">{{ IDX_0.data.timings.Asr | slice: 0, 5 }}</span>
            </div>
          </div>
          <!-- Maghrib -->
          <div class="grid grid-col-2 border--h-3">
            <div class="row row--start">
              <span class="title">Maghrib</span>
            </div>
            <div class="row row--end">
              <span class="title">{{ IDX_0.data.timings.Maghrib | slice: 0, 5 }}</span>
            </div>
          </div>
          <!-- Isha -->
          <div class="grid grid-col-2 border--h-3">
            <div class="row row--start">
              <span class="title">Isha</span>
            </div>
            <div class="row row--end">
              <span class="title">{{ IDX_0.data.timings.Isha | slice: 0, 5 }}</span>
            </div>
          </div>
        </div>
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
