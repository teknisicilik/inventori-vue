<template>
  <div v-if="mainData && mainData.data.length" class="card card-custom mt-3">
    <div class="card-header border-0 pt-4" style="flex-wrap:nowrap; min-height:0px">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark mt-2" style="white-space: nowrap;">Proses Import</span>
        <span v-if="limit==1" @click="limit = 5" class="text-primary mt-1 font-weight-bold font-size-sm pointer" style="white-space: nowrap;">Lihat Antrian Lainnya</span>
        <span v-else @click="limit = 1" class="text-primary mt-1 font-weight-bold font-size-sm pointer" style="white-space: nowrap;">Sembunyikan Antrian</span>
      </h3>
      <div class="flex-fill pl-5">
        <table v-if="primaryData.length" class="table table-borderless table-vertical-center mb-2">
          <template v-for="(d,i) in primaryData">
            <tr :key="i+'queue-table'">
              <td class="v-center nowrap-table pl-0">
                <div class="symbol symbol-40 mr-2" :class="'symbol-'+ defineStatusClass(d.status, true)">
                  <span class="symbol-label">
                    <span v-if="d.status === 'success'" class="svg-icon svg-icon-primary svg-icon-2x">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24" />
                          <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002) " />
                        </g>
                      </svg>
                    </span>
                    <span v-else-if="d.status === 'proccessing'" class="svg-icon svg-icon-lg svg-icon-primary rotating">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                        </g>
                      </svg>
                    </span>
                    <span v-else class="svg-icon svg-icon-danger svg-icon-2x">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                            <rect x="0" y="7" width="16" height="2" rx="1" />
                            <rect opacity="0.3" transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1" />
                          </g>
                        </g>
                      </svg>
                    </span>
                  </span>
                </div>
              </td>
              <td class="v-center pl-0 nowrap-table">
                <template v-if="d.agenda_id !== 0">
                  <span v-if="datasetList.agenda.length" class="d-block text-dark font-weight-bolder text-hover-primary mb-0 font-size-lg text-capitalize">{{ datasetList.agenda.filter(x=> x.code === d.agenda_id)[0].label }}</span>
                  <span class="text-muted font-weight-bold d-block text-capitalize">Skenario {{ d.scenario_input }}</span>
                </template>
                <template v-else>
                  <span v-if="datasetList.agenda.length" class="d-block text-dark font-weight-bolder text-hover-primary mb-0 font-size-lg text-capitalize">{{ datasetList.agenda.filter(x=> x.code === d.agenda_id)[0].label }}</span>
                  <span class="text-muted font-weight-bold d-block text-capitalize">Tahun {{ d.periode_year | parse('year') }}</span>
                </template>
              </td>
              <td class="v-center px-10">
                <div v-if="d.status === 'error'">
                  <span class="text-danger font-weight-bolder font-size-sm d-block text-uppercase">Proccess Failed !</span>
                  <p class="mb-0 font-size-sm text-line-2" style="word-break: break-all;line-height:1.1"> {{ d.failed_reason }} </p>
                </div>
                <div v-else class="d-flex flex-column w-100 mr-2">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="text-muted mr-2 font-size-sm font-weight-bold">{{ d.finish_job > 0? Number(d.count_job/d.finish_job * 100).toFixed(0) : 0 }}%</span>
                    <span class="text-muted font-size-sm font-weight-bold text-capitalize">{{ d.status }} ({{ d.finish_job }}/{{d.count_job}})</span>
                  </div>
                  <b-progress :max="d.count_job" height="10px">
                    <b-progress-bar :value="d.finish_job"></b-progress-bar>
                  </b-progress>
                </div>
              </td>
              <td class="v-center pl-0 pr-5 nowrap-table">
                <span class="font-size-sm font-weight-bolder d-block text-capitalize">Upload by {{ d.rel_upload_by }}</span>
                <span class="text-muted font-size-sm font-weight-bold d-block text-capitalize">{{ d.created_at | parse('longDateTime') }}</span>
              </td>
              <td class="v-center text-right pr-0">
                <a :href="d.file_path.url" target="_blank" class="btn btn-icon btn-light btn-sm">
                  <span class="svg-icon svg-icon-md svg-icon-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1" />
                        <path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) " />
                      </g>
                    </svg>
                  </span>
                </a>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div v-if="limit > 1" class="card-body pt-0 pb-3">
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <template v-for="(d,i) in page===1? mainData.data.filter((x,i) => i !== 0) : mainData.data">
            <tr :key="i+'queue-table'">
              <td class="nowrap-table pl-0">
                <div class="symbol symbol-40 mr-2" :class="'symbol-'+ defineStatusClass(d.status, true)">
                  <span class="symbol-label">
                    <span v-if="d.status === 'success'" class="svg-icon svg-icon-primary svg-icon-2x">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24" />
                          <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002) " />
                        </g>
                      </svg>
                    </span>
                    <span v-else-if="d.status === 'proccessing'" class="svg-icon svg-icon-lg svg-icon-primary rotating">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                        </g>
                      </svg>
                    </span>
                    <span v-else-if="d.status === 'error'" class="svg-icon svg-icon-danger svg-icon-2x">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                            <rect x="0" y="7" width="16" height="2" rx="1" />
                            <rect opacity="0.3" transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1" />
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span v-else class="svg-icon svg-icon-lg svg-icon-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                        </g>
                      </svg>
                    </span>
                  </span>
                </div>
              </td>
              <td class="pl-0 nowrap-table">
                <template v-if="d.agenda_id !== 0">
                  <span v-if="datasetList.agenda.length" class="d-block text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg text-capitalize">{{ datasetList.agenda.filter(x=> x.code === d.agenda_id)[0].label }}</span>
                  <span class="text-muted font-weight-bold d-block text-capitalize">Skenario {{ d.scenario_input }}</span>
                </template>
                <template v-else>
                  <span v-if="datasetList.agenda.length" class="d-block text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg text-capitalize">{{ datasetList.agenda.filter(x=> x.code === d.agenda_id)[0].label }}</span>
                  <span class="text-muted font-weight-bold d-block text-capitalize">Tahun {{ d.periode_year | parse('year') }}</span>
                </template>
              </td>
              <td class="px-10">
                <div v-if="d.status === 'error'">
                  <span class="text-danger font-weight-bolder font-size-sm d-block text-uppercase">Proccess Failed !</span>
                  <p class="mb-0 font-size-sm"> {{ d.failed_reason }} </p>
                </div>
                <div v-else class="d-flex flex-column w-100 mr-2">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="text-muted mr-2 font-size-sm font-weight-bold">{{ d.finish_job > 0? Number(d.count_job/d.finish_job * 100).toFixed(0) : 0 }}%</span>
                    <span class="text-muted font-size-sm font-weight-bold text-capitalize">{{ d.status }} ({{ d.finish_job }}/{{d.count_job}})</span>
                  </div>
                  <b-progress :max="d.count_job" height="10px">
                    <b-progress-bar :value="d.finish_job"></b-progress-bar>
                  </b-progress>
                </div>
              </td>
              <td class="pl-0 pr-5 nowrap-table">
                <span class="text-muted font-weight-bold d-block text-capitalize">Upload by {{ d.rel_upload_by }}</span>
                <span class="text-muted font-weight-bold d-block text-capitalize">{{ d.created_at | parse('longDateTime') }}</span>
              </td>
              <!-- <td class="text-right pr-0">
                <a :href="d.file_path.url" target="_blank" class="btn btn-icon btn-light btn-sm">
                  <span class="svg-icon svg-icon-md svg-icon-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1" />
                        <path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) " />
                      </g>
                    </svg>
                  </span>
                </a>
              </td> -->
            </tr>
          </template>
        </table>
      </div>
      <hr>
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <span></span>
        <div>
          <span class="px-3">{{ page }} dari {{ mainData.totalPage }} Halaman</span>
          <button :disabled="page === 1" @click="page--" class="btn btn-sm btn-outline-primary">Sebelumnya</button>
          <button :disabled="page === mainData.totalPage" @click="page++" class="btn btn-sm btn-outline-primary">Selanjutnya</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')
export default {
  name: 'queue-import-module',
  props: {
    API: {
      type: String,
      required: true,
      default () { return '' }
    },
    filters: {
      type: Object,
      required: true,
      default () { return {} }
    }
  },
  watch: {
    API: {
      deep: false,
      immediate: true,
      handler (e) {
        if (e) this.localFilter = Object.assign({}, this.localFilter, { module: e })
      }
    },
    filters: {
      deep: true,
      immediate: true,
      handler (e) {
        this.localFilter = Object.assign({}, this.localFilter, e, { limit: 1, page: 1 })
      }
    },
    limit: {
      deep: true,
      immediate: false,
      handler (e) {
        this.localFilter = Object.assign({}, this.localFilter, { limit: e })
      }
    },
    page: {
      deep: true,
      immediate: false,
      handler (e) {
        this.localFilter = Object.assign({}, this.localFilter, { page: e })
      }
    },
    localFilter: {
      deep: true,
      immediate: false,
      handler (e) {
        if (e.module) this.getQueue(e)
      }
    }
  },
  data () {
    return {
      localFilter: {},
      mainData: null,
      primaryData: [],
      limit: 1,
      page: 1,
      datasetList: {
        agenda: []
      },
      timeOut: null
    }
  },
  destroyed () {
    clearTimeout(this.timeOut)
  },
  methods: {
    bulidDataset () {
      let result = []
      for (let i = 0; i < 13; i++) {
        const e = -Math.abs(i)
        result.push({ label: i === 0 ? 'RKAP' : 'Stress Test ' + moment().set('date', 1).set('month', i - 1).format('MMMM'), code: i === 0 ? i : e })
      }
      this.$set(this.datasetList, 'agenda', result)
    },
    getQueue (e) {
      let form = Object.assign({}, e)
      this.bulidDataset()
      form.sort = 'DESC'
      form.sort_by = 'id'
      delete form.scenario_input
      if (this.page === 1 && this.limit !== 1) form.limit = form.limit + 1
      this.$_api.list('queue-modules', form).then(res => {
        this.mainData = res
        if (this.page === 1) this.primaryData = res.data.filter((x, i) => i === 0)
        if (res.data.length) this.mockWebService(res.data)
        else this.$emit('done', true)
      }, err => {
        clearTimeout(this.timeOut)
        this.$emit('done', true)
        this.$_alert.error(err)
      })
    },
    mockWebService (e) {
      if (e[0].status === 'success' || e[0].status === 'error') {
        this.$emit('done', true)
        clearTimeout(this.timeOut)
      } else {
        this.timeOut = setTimeout(() => {
          this.getQueue(this.localFilter)
        }, 5000)
      }
    },
    defineStatusClass (data, isLight) {
      let classCSS = ''
      if (isLight) classCSS += 'light-'
      if (data === 'success') classCSS += 'primary'
      else if (data === 'proccessing') classCSS += 'primary'
      else if (data === 'error') classCSS += 'danger'
      else classCSS += 'info'
      return classCSS
    },
    refreshData () {
      this.getQueue(this.localFilter)
    }
  }

}
</script>

<style>
  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .rotating {
    -webkit-animation: rotating 2.5s linear infinite;
    -moz-animation: rotating 2.5s linear infinite;
    -ms-animation: rotating 2.5s linear infinite;
    -o-animation: rotating 2.5s linear infinite;
    animation: rotating 2.5s linear infinite;
  }
</style>
