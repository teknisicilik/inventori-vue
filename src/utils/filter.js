import Vue from 'vue'
import moment from 'moment'
moment.locale('id')
Vue.filter('parse', (value, id) => {
  if (id === null || id === undefined) return value
  if (value === null || value === undefined) return value
  let toReturn = ''
  if (id.search('-') === -1) {
    switch (id) {
      case 'active':
        toReturn = value === 1 ? 'Data Aktif' : 'Non Aktif'
        break
      case 'expired':
        toReturn = value === 1 ? 'Aktif' : 'Expired'
        break
      case 'is_hazard':
        toReturn = value === 1 ? 'Berbahaya' : 'Tidak Berbahaya'
        break
      case 'is_need_investigation':
        toReturn = value ? 'Ya, diperlukan investigasi' : 'Tidak memerlukan investigasi'
        break
      case 'status_code':
        if (value === 'non_active') toReturn = 'Non Aktif'
        else toReturn = 'Data Aktif'
        break
      case 'user_status_code':
        if (value === 'user_nonactive') toReturn = 'Non Aktif'
        else toReturn = 'Data Aktif'
        break
      case 'uppercase':
        toReturn = value.toUpperCase().split('_').join(' ')
        break
      case 'allow':
        toReturn = value.toLowerCase() === 'y' ? 'DIperbolehkan' : 'Tidak diizinkan'
        break
      case 'yn':
        toReturn = value.toLowerCase() === 'y' ? 'Ya' : 'Tidak'
        break
      case 'ynBool':
        toReturn = value ? 'Ya' : 'Tidak'
        break
      case 'nullValue':
        toReturn = value || '-'
        break
      case 'safe':
        toReturn = value === 'safe' ? 'Aman' : 'Tidak Aman'
        break
      case 'conscious':
        toReturn = value === 'conscious' ? 'Sadar' : 'Tidak Sadar'
        break
      case 'first_aid_action':
        toReturn = value === 'p3k' ? 'P3K' : 'Rumah Sakit'
        break
      case 'action_type_accident':
        toReturn = value === 'corrective' ? 'Tindakan Perbaikan' : 'Tindakan Pencegahan'
        break
      case 'fix_time_plan':
        if (value === 'one_day') toReturn = '1 Hari'
        else if (value === 'one_week') toReturn = '1 Minggu'
        else if (value === 'less_month') toReturn = '< 1 Bulan'
        else if (value === 'over_month') toReturn = '> 1 Bulan'
        else if (value === 'over_year') toReturn = '> 1 Tahun'
        else toReturn = value
        break
      case 'equipment_status':
        if (value === 'usable') toReturn = 'Dapat Digunakan'
        else if (value === 'unusable') toReturn = 'Tidak Dapat Digunakan'
        else toReturn = 'Butuh Perbaikan'
        break
      case 'inspection_status':
        if (value === 'waiting') toReturn = 'Menunggu Verifikasi'
        else if (value === 'verified') toReturn = 'Terverifikasi'
        else toReturn = value
        break
      case 'verify':
        if (value === 'revision_request') toReturn = 'Permintaan Revisi'
        else if (value === 'verification_request') toReturn = 'Pengajuan Verifikasi'
        else if (value === 'appraisal_request') toReturn = 'Permintaan Penilaian'
        else if (value === 'approved') toReturn = 'Disetujui'
        else if (value === 'draft') toReturn = 'Draft'
        else toReturn = value
        break
      case 'number':
        toReturn = !isNaN(value) ? Number(value).toLocaleString('id') : value
        break
      case 'number2fraction':
        toReturn = !isNaN(value) ? Number(value).toLocaleString('id', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value
        break
      case 'money':
        toReturn = !isNaN(value) ? 'Rp. ' + Number(value).toLocaleString('id') : value
        break
      case 'longDate':
        if (moment(value, 'YYYY-MM-DD', true).isValid()) toReturn = moment(value, 'YYYY-MM-DD').format('LL')
        else if (moment(value, 'YYYY-MM-D', true).isValid()) toReturn = moment(value, 'YYYY-MM-D').format('LL')
        else toReturn = value
        break
      case 'longDateTime':
        toReturn = moment(value).format('LLLL')
        break
      case 'longDateTimeUTC':
        if (moment(value, 'YYYY-MM-DD', true).isValid()) toReturn = moment(value, 'YYYY-MM-DD').utcOffset('+00:00').format('LLLL')
        else toReturn = value
        break
      case 'period':
        if (moment(value, 'YYYY-MM-DD', true).isValid()) toReturn = moment(value).format('MMMM YYYY')
        else toReturn = value
        break
      case 'numberMonth':
        toReturn = moment().set('date', 1).set('month', value).format('MMM')
        break
      case 'numberMonthLong':
        toReturn = moment().set('date', 1).set('month', value).format('MMMM')
        break
      case 'longMonth':
        if (moment(value, 'YYYY-MM-DD', true).isValid()) toReturn = moment(value).format('MMMM')
        else toReturn = value
        break
      case 'year':
        if (moment(value, 'YYYY-MM-DD', true).isValid()) toReturn = moment(value).format('YYYY')
        else toReturn = value
        break
      case 'hours':
        let parsed = value.split(':')
        parsed[0] = (Number(parsed[0]) > 0) ? Number(parsed[0]) + ' Jam' : null
        parsed[1] = (Number(parsed[1]) > 0) ? Number(parsed[1]) + ' Menit' : null
        parsed[2] = (Number(parsed[2]) > 0) ? Number(parsed[2]) + ' Detik' : null
        toReturn = parsed.filter(x => x).join(', ')
        break
      case 'time':
        toReturn = moment(value, 'HH:mm:ss').format('LTS a')
        break
      case 'kelamin':
        toReturn = value.toLowerCase() === 'male' ? 'Laki-Laki' : 'Perempuan'
        break
      case 'kelamin_indo':
        toReturn = value === 'L' ? 'Laki-Laki' : 'Perempuan'
        break
      case 'nfc_status':
        toReturn = value ? 'Terpasang' : 'Belum Terpasang'
        break
      case 'capitalize':
        toReturn = value.toLowerCase().split('_').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' ')
        break
      case 'company_group':
        toReturn = value.toLowerCase() === 'induk' ? 'Induk' : 'Non Induk'
        break
      case 'operational_status':
        if (value === 'idle') toReturn = 'Idle'
        else if (value === 'operational') toReturn = 'Beroperasi'
        else toReturn = value
        break
      case 'equipment_condition':
        // if (value === 'good') toReturn = 'Baik'
        // else if (value === 'damaged') toReturn = 'Rusak'
        // else if (value === 'lost') toReturn = 'Hilang'
        // else toReturn = value
        // break
        if (value === 'usable') toReturn = 'Dapat Digunakan'
        else if (value === 'unusable') toReturn = 'Tidak Dapat Digunakan'
        else toReturn = 'Butuh Perbaikan'
        break
      case 'employment_status':
        if (value === 'organik') toReturn = 'Organik'
        else if (value === 'os') toReturn = 'Outsourcing'
        else if (value === 'pkwt') toReturn = 'PKWT'
        break
      case 'ownership_code':
        if (value === 'unit') toReturn = 'Unit'
        else if (value === 'department') toReturn = 'Departemen'
        else if (value === 'division') toReturn = 'Divisi'
        else if (value === 'pusat') toReturn = 'Pusat'
        else toReturn = value
        break
      default:
        toReturn = value
    }
  } else {
    switch (id.split('-')[0]) {
      case 'prefix':
        toReturn = id.split('-')[1] + ' ' + value
        break
      case 'suffix':
        toReturn = value + ' ' + id.split('-')[1]
        break
      default:
        toReturn = value
    }
  }
  return toReturn
})
export default {
  name: 'filterTemplate'
}
