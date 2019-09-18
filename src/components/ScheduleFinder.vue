<template>
  <v-container class="ma-3">
    <v-layout row>
      <v-flex xs12 sm12 md6 lg6>
        <v-autocomplete
          :items="courses"
          label="Select Your Courses"
          class="pt-3 pl-3 pr-3 pb-1"
          v-model="selectedCourses"
          menu-props="auto"
          item-text="code"
          return-object
          outline
          multiple
        ></v-autocomplete>
      </v-flex>
      <v-btn class="ma-3" @click="findSchedules" color="info">Find Possible Schedules</v-btn>
      <v-btn class="ma-3" @click="clear" color="error">Clear All</v-btn>
    </v-layout>

    <div v-if="selectedCourses.length>0" class="mt-3 mb-5">
      <h4
        v-for="item in selectedCourses"
        :key="item.code"
      >{{item.code}} - {{item.course}} - ({{item.ects}} ECTS)</h4>
    </div>

    <h3
      v-if="show && combinationsArray.length>1"
      class="ma-3"
    >There are {{combinationsArray.length}} possible schedules.</h3>
    <h3 v-if="show && combinationsArray.length==1" class="ma-3">There is 1 possible schedule.</h3>
    <h3 v-if="show && combinationsArray.length==0" class="ma-3">There is no possible schedule.</h3>

    <v-layout wrap>
      <v-flex
        xs12
        sm12
        md12
        lg6
        xl6
        v-for="(comb, index) in combinationsArray"
        :key="index"
        class="pa-3"
      >
        <div>
          <h1>Variation #{{index+1}}</h1>
          <table>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>

            <tr>
              <td>9:00-9:50</td>
              <td>
                <span v-if="comb.includes(1)">{{courseNames[index][1]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(15)">{{courseNames[index][15]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(29)">{{courseNames[index][29]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(43)">{{courseNames[index][43]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(57)">{{courseNames[index][57]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(71)">{{courseNames[index][71]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(85)">{{courseNames[index][85]}}</span>
              </td>
            </tr>

            <tr>
              <td>10:00-10:50</td>
              <td>
                <span v-if="comb.includes(2)">{{courseNames[index][2]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(16)">{{courseNames[index][16]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(30)">{{courseNames[index][30]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(44)">{{courseNames[index][44]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(58)">{{courseNames[index][58]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(72)">{{courseNames[index][72]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(86)">{{courseNames[index][86]}}</span>
              </td>
            </tr>

            <tr>
              <td>11:00-11:50</td>
              <td>
                <span v-if="comb.includes(3)">{{courseNames[index][3]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(17)">{{courseNames[index][17]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(31)">{{courseNames[index][31]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(45)">{{courseNames[index][45]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(59)">{{courseNames[index][59]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(73)">{{courseNames[index][73]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(87)">{{courseNames[index][87]}}</span>
              </td>
            </tr>

            <tr>
              <td>12:00-12:50</td>
              <td>
                <span v-if="comb.includes(4)">{{courseNames[index][4]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(18)">{{courseNames[index][18]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(32)">{{courseNames[index][32]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(46)">{{courseNames[index][46]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(60)">{{courseNames[index][60]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(74)">{{courseNames[index][74]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(88)">{{courseNames[index][88]}}</span>
              </td>
            </tr>

            <tr>
              <td>13:00-13:50</td>
              <td>
                <span v-if="comb.includes(5)">{{courseNames[index][5]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(19)">{{courseNames[index][19]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(33)">{{courseNames[index][33]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(47)">{{courseNames[index][47]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(61)">{{courseNames[index][61]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(75)">{{courseNames[index][75]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(89)">{{courseNames[index][89]}}</span>
              </td>
            </tr>

            <tr>
              <td>14:00-14:50</td>
              <td>
                <span v-if="comb.includes(6)">{{courseNames[index][6]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(20)">{{courseNames[index][20]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(34)">{{courseNames[index][34]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(48)">{{courseNames[index][48]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(62)">{{courseNames[index][62]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(76)">{{courseNames[index][76]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(90)">{{courseNames[index][90]}}</span>
              </td>
            </tr>

            <tr>
              <td>15:00-15:50</td>
              <td>
                <span v-if="comb.includes(7)">{{courseNames[index][7]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(21)">{{courseNames[index][21]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(35)">{{courseNames[index][35]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(49)">{{courseNames[index][49]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(63)">{{courseNames[index][63]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(77)">{{courseNames[index][77]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(91)">{{courseNames[index][91]}}</span>
              </td>
            </tr>

            <tr>
              <td>16:00-16:50</td>
              <td>
                <span v-if="comb.includes(8)">{{courseNames[index][8]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(22)">{{courseNames[index][22]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(36)">{{courseNames[index][36]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(50)">{{courseNames[index][50]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(64)">{{courseNames[index][64]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(78)">{{courseNames[index][78]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(92)">{{courseNames[index][92]}}</span>
              </td>
            </tr>

            <tr>
              <td>17:00-17:50</td>
              <td>
                <span v-if="comb.includes(9)">{{courseNames[index][9]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(23)">{{courseNames[index][23]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(37)">{{courseNames[index][37]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(51)">{{courseNames[index][51]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(65)">{{courseNames[index][65]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(79)">{{courseNames[index][79]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(93)">{{courseNames[index][93]}}</span>
              </td>
            </tr>

            <tr>
              <td>18:00-18:50</td>
              <td>
                <span v-if="comb.includes(10)">{{courseNames[index][10]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(24)">{{courseNames[index][24]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(38)">{{courseNames[index][38]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(52)">{{courseNames[index][52]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(66)">{{courseNames[index][66]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(80)">{{courseNames[index][80]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(94)">{{courseNames[index][94]}}</span>
              </td>
            </tr>

            <tr>
              <td>19:00-19:50</td>
              <td>
                <span v-if="comb.includes(11)">{{courseNames[index][11]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(25)">{{courseNames[index][25]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(39)">{{courseNames[index][39]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(53)">{{courseNames[index][53]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(67)">{{courseNames[index][67]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(81)">{{courseNames[index][81]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(95)">{{courseNames[index][95]}}</span>
              </td>
            </tr>

            <tr>
              <td>20:00-20:50</td>
              <td>
                <span v-if="comb.includes(12)">{{courseNames[index][12]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(26)">{{courseNames[index][26]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(40)">{{courseNames[index][40]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(54)">{{courseNames[index][54]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(68)">{{courseNames[index][68]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(82)">{{courseNames[index][82]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(96)">{{courseNames[index][96]}}</span>
              </td>
            </tr>

            <tr>
              <td>21:00-21:50</td>
              <td>
                <span v-if="comb.includes(13)">{{courseNames[index][13]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(27)">{{courseNames[index][27]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(41)">{{courseNames[index][41]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(55)">{{courseNames[index][55]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(69)">{{courseNames[index][69]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(83)">{{courseNames[index][83]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(97)">{{courseNames[index][97]}}</span>
              </td>
            </tr>

            <tr>
              <td>22:00-22:50</td>
              <td>
                <span v-if="comb.includes(14)">{{courseNames[index][14]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(28)">{{courseNames[index][28]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(42)">{{courseNames[index][42]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(56)">{{courseNames[index][56]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(70)">{{courseNames[index][70]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(84)">{{courseNames[index][84]}}</span>
              </td>
              <td>
                <span v-if="comb.includes(98)">{{courseNames[index][98]}}</span>
              </td>
            </tr>
          </table>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      courses: [
        {
          code: "ACC 301",
          course: "Muhasebe Bilgi Sistemlerinin Temelleri",
          ects: "6",
          time: [[59, 60, 61]]
        },
        {
          code: "ACC 305",
          course: "İleri Muhasebe",
          ects: "6",
          time: [[1, 2, 3]]
        },
        {
          code: "ACC 341",
          course: "Orta Düzey Muhasebe II",
          ects: "8",
          time: [[33, 34, 35]]
        },
        {
          code: "ACC 420",
          course: "Kurumsal Risk Yönetimi",
          ects: "5",
          time: [[31, 32, 33]]
        },
        {
          code: "ACC 482",
          course: "Muhasebe Etik Projesi",
          ects: "6",
          time: [[47, 48, 49]]
        },
        {
          code: "ADL 101",
          course: "Anayasa Hukuku",
          ects: "7",
          time: [[1, 2, 3]]
        },
        {
          code: "ADL 103",
          course: "Hukuka Giriş",
          ects: "7",
          time: [[47, 48, 49]]
        },
        {
          code: "ADL 105",
          course: "Klavye Kullanımı I",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "ADL 201",
          course: "Ceza Hukuku Bilgisi",
          ects: "4",
          time: [[2, 3, 4]]
        },
        {
          code: "ADL 203",
          course: "Borçlar Hukuku Bilgisi",
          ects: "4",
          time: [[5, 6, 7]]
        },
        {
          code: "ADL 205",
          course: "Kalem Mevzuatı ve İşlemleri",
          ects: "3",
          time: [[15, 16, 17]]
        },
        {
          code: "ADL 207",
          course: "İcra ve İflas Hukuku",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "ADL 209",
          course: "Ticaret Hukuku Bilgisi",
          ects: "4",
          time: [[61, 62, 63]]
        },
        {
          code: "ADL 211",
          course: "Klavye Kullanımı III",
          ects: "4",
          time: [[19, 20, 21], [46, 47, 48]]
        },
        {
          code: "ADL 241",
          course: "Turizm Mevzuatı",
          ects: "3",
          time: [[36, 37]]
        },
        {
          code: "ADL 260",
          course: "Banka ve Bankacılık Hukuku Bilgisi",
          ects: "3",
          time: [[43, 44]]
        },
        {
          code: "AE 301",
          course: "Aerodinamik",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "AE 303",
          course: "Ölçme Tekniği",
          ects: "5",
          time: [[29, 30, 36, 37]]
        },
        {
          code: "AE 311",
          course: "Yörünge Mekaniği",
          ects: "6",
          time: [[50, 51, 64, 65]]
        },
        {
          code: "AE 405",
          course: "Hava Aracı Tasarımı",
          ects: "6",
          time: [[7, 8, 9]]
        },
        {
          code: "AE 409",
          course: "Itki Sistemleri",
          ects: "6",
          time: [[63, 64, 65, 66]]
        },
        {
          code: "AE 418",
          course: "Mühendislik Optimizasyonu",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "AE 419",
          course: "Hesaplamalı Akışkanlar Dinamiğine Giriş",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "AE 423",
          course: "Antenlere Giriş",
          ects: "5",
          time: [[33, 34, 59, 60]]
        },
        {
          code: "AE 451",
          course: "Astrofizik Sistemleri",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "AET 101",
          course: "Kelime ve Kompozisyon I",
          ects: "6",
          time: [[1, 2, 29, 30]]
        },
        {
          code: "AET 103",
          course: "Karşılaştırmalı Dilbilgisi I",
          ects: "6",
          time: [[32, 33, 60, 61]]
        },
        {
          code: "AET 105",
          course: "Çeviri ve Dil",
          ects: "6",
          time: [[15, 16, 43, 44]]
        },
        {
          code: "AET 107",
          course: "Dinleme ve Konuşma Becerileri",
          ects: "6",
          time: [[3, 4, 62, 63]]
        },
        {
          code: "AET 201",
          course: "Sözlü Çeviri I",
          ects: "5",
          time: [[4, 5, 6], [57, 58, 59]]
        },
        {
          code: "AET 203",
          course: "Teknik Çeviri",
          ects: "6",
          time: [[49, 50, 51]]
        },
        {
          code: "AET 205",
          course: "Edebiyat ve Çeviri",
          ects: "5",
          time: [[22, 23, 48]]
        },
        {
          code: "AET 207",
          course: "Yazılı Çeviri II",
          ects: "5",
          time: [[20, 21, 46, 47]]
        },
        {
          code: "AET 209",
          course: "Meslek Etiği",
          ects: "5",
          time: [[35, 36, 37]]
        },
        {
          code: "AET 231",
          course: "Yazılı Medya Çevirileri",
          ects: "4",
          time: [[17, 18, 19]]
        },
        {
          code: "ARCH 101",
          course: "Mimarlığa Giriş I",
          ects: "4",
          time: [[32, 33, 34]]
        },
        {
          code: "ARCH 201",
          course: "Mimari Tasarım I",
          ects: "8",
          time: [[15, 16, 17, 18, 19, 57, 58, 59, 60]]
        },
        {
          code: "ARCH 203",
          course: "Mimarlık Tarihleri ve Teorileri I",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "ARCH 205",
          course: "Statik ve Mukavemet",
          ects: "4",
          time: [[48, 49, 50, 51]]
        },
        {
          code: "ARCH 207",
          course: "Mimari Yapı ve Malzemeler I",
          ects: "5",
          time: [[1, 2, 3, 4, 5]]
        },
        {
          code: "ARCH 301",
          course: "Mimari Tasarım III",
          ects: "9",
          time: [[5, 6, 7, 8, 9, 47, 48, 49, 50]]
        },
        {
          code: "ARCH 303",
          course: "Bina Yapım Projesi I",
          ects: "5",
          time: [[29, 30, 31, 32, 33]]
        },
        {
          code: "ARCH 305",
          course: "Mimarlık için Çevresel Kontrol Sistemleri",
          ects: "4",
          time: [[62, 63, 64, 65]]
        },
        {
          code: "ARCH 306",
          course: "Yapım İşletmesi",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "ARCH 322",
          course: "İşlemsel Tasarıma Giriş",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "ARCH 324",
          course: "Türkiye'de Modern Mimarlık Kültürü",
          ects: "4",
          time: [[35, 36, 37]]
        },
        {
          code: "ARCH 328",
          course: "Doğa ile Tasarım:Mimari Tasarımda Biyomimikri",
          ects: "4",
          time: [[21, 22, 23, 24]]
        },
        {
          code: "ARCH 330",
          course: "Yapı Strüktürlerinde Örnek Çalışmalar",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "ARCH 350",
          course: "Mimarlık ve Görsellik",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "ARCH 360",
          course: "Yapı Örtü Sistemleri",
          ects: "4",
          time: [[35, 36, 37]]
        },
        {
          code: "ARCH 362",
          course: "Mimari Zeka: Mimarlıkta Yapay Zeka",
          ects: "4",
          time: [[61, 62, 63, 64, 65]]
        },
        {
          code: "ARCH 390",
          course: "Gösteri Sanatları Mekanları",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "ARCH 401",
          course: "Mimari Tasarım V",
          ects: "9",
          time: [[15, 16, 17, 18, 19, 57, 58, 59, 60]]
        },
        {
          code: "ARCH 404",
          course: "Portfolyo Tasarımı",
          ects: "4",
          time: [[1, 2, 3, 4], [62, 63, 64, 65]]
        },
        {
          code: "ARCH 410",
          course: "Sanat, Tasarım ve Kentsel Mekan",
          ects: "4",
          time: [[19, 20, 21]]
        },
        {
          code: "ARCH 451",
          course: "Mimarlıkta Uygulamalı Atölye Çalışması",
          ects: "1",
          time: [[7, 8]]
        },
        {
          code: "ARCH 472",
          course: "Mimarlıkta İleri Araştırma ve Akademik Yazı",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "ARCH 480",
          course: "Kentsel Tasarım İlkeleri",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "ARCH 495",
          course: "Mimaride Etik ve Sosyal Sorumluluk",
          ects: "4",
          time: [[21, 22, 23, 24]]
        },
        {
          code: "ARCH 498",
          course: "Bitirme Projesi",
          ects: "10",
          time: [[18, 19, 20, 21, 59, 60, 61, 62, 63]]
        },
        {
          code: "BA 125",
          course: "İş Dinamikleri",
          ects: "6",
          time: [[57, 58, 59]]
        },
        {
          code: "BA 201",
          course: "Pazarlama İlkeleri",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "BA 221",
          course: "Finansal Muhasebe",
          ects: "5",
          time: [[29, 30, 31], [15, 16, 17]]
        },
        {
          code: "BA 250",
          course: "Yönetim Bilimi",
          ects: "6",
          time: [[49, 50, 51], [21, 22, 23], [60, 61, 62]]
        },
        {
          code: "BA 260",
          course: "Yönetim ve Organizasyon",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "BA 316",
          course: "Liderlik ve Yönetişim",
          ects: "6",
          time: [[47, 48, 49]]
        },
        {
          code: "BA 320",
          course: "Tüketici Davranışları",
          ects: "6",
          time: [[32, 33, 34], [43, 44, 45]]
        },
        {
          code: "BA 324",
          course: "Marka Yönetimi",
          ects: "6",
          time: [[61, 62, 63]]
        },
        {
          code: "BA 350",
          course: "Yönetim ve Maliyet Muhasebesi",
          ects: "6",
          time: [[63, 64, 65]]
        },
        {
          code: "BA 360",
          course: "İnsan Kaynakları Yönetimi",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "BA 370",
          course: "Pazarlama Araştırması",
          ects: "4",
          time: [[19, 20, 21]]
        },
        {
          code: "BA 380",
          course: "Uluslararası İşletmecilik",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "BA 411",
          course: "Üretim Planlaması ve Stok Kontrolü",
          ects: "6",
          time: [[1, 2, 3]]
        },
        {
          code: "BA 443",
          course: "İç Kontrol ve İç Denetimin Temelleri",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "BILT 100",
          course: "Bilgisayara Giriş ve Enformasyon Teknolojisi",
          ects: "3",
          time: [
            [8, 9, 57, 58],
            [22, 23, 64, 65],
            [5, 6, 61, 62],
            [63, 64, 65, 66],
            [6, 7, 20, 21]
          ]
        },
        {
          code: "BLG 153",
          course: "Bilgisayar Entegre Ofis Programları I",
          ects: "3",
          time: [[32, 33]]
        },
        {
          code: "BME 201",
          course: "Biyomedikal Mühendisliğine Giriş",
          ects: "5",
          time: [[8, 9, 15, 16]]
        },
        {
          code: "BME 301",
          course: "Biyomalzeme",
          ects: "5",
          time: [[6, 7, 35, 36], [33, 34, 57, 58], [6, 7, 49, 50]]
        },
        {
          code: "BME 305",
          course: "Biyomedikal Elektronik",
          ects: "5",
          time: [[43, 44, 64, 65]]
        },
        {
          code: "BME 315",
          course: "Moleküler Biyofizik",
          ects: "5",
          time: [[18, 19, 20]]
        },
        {
          code: "BME 401",
          course: "Tıbbi Görüntüleme",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "BME 405",
          course: "Biyomedikal Optik",
          ects: "5",
          time: [[21, 22, 48, 49]]
        },
        {
          code: "BNK 101",
          course: "Sigortacılığa Giriş",
          ects: "5",
          time: [[18, 19]]
        },
        {
          code: "BNK 127",
          course: "Yatırım Analizi ve Portföy Yönetimi",
          ects: "5",
          time: [[64, 65, 66]]
        },
        {
          code: "BNK 201",
          course: "Temel Kredi İşlemleri",
          ects: "4",
          time: [[46, 47]]
        },
        {
          code: "BNK 203",
          course: "Sigortacılık İşlemleri I",
          ects: "4",
          time: [[34, 35]]
        },
        {
          code: "BNK 205",
          course: "Sermaye Piyasaları",
          ects: "5",
          time: [[7, 8, 9]]
        },
        {
          code: "BNK 207",
          course: "Bankacılık İşlemleri I",
          ects: "5",
          time: [[49, 50, 51]]
        },
        {
          code: "BNK 211",
          course: "Vadeli İşlemler Borsası İşlemleri",
          ects: "4",
          time: [[36, 37, 38]]
        },
        {
          code: "BNK 213",
          course: "İşletme Finansı",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "CBM 101",
          course: "Tıbbın Klinik Temelleri I",
          ects: "3",
          time: [[19, 20, 21]]
        },
        {
          code: "CBM 201",
          course: "Tıbbın Klinik Temelleri III",
          ects: "4",
          time: [[47, 48, 49, 50]]
        },
        {
          code: "CBM 301",
          course: "Tıbbın Klinik Temelleri V",
          ects: "6",
          time: [[5, 6, 7, 8, 22, 23]]
        },
        {
          code: "CDM 101",
          course: "Sesler, Görüntüler, Kültürler I",
          ects: "6",
          time: [[29, 30, 64, 65]]
        },
        {
          code: "CDM 201",
          course: "Hareketli Görüntülerin Kuram ve Pratiği I",
          ects: "8",
          time: [[1, 2, 3, 29, 30, 31]]
        },
        {
          code: "CDM 203",
          course: "Yaratıcı Yazarlık",
          ects: "5",
          time: [[5, 6, 50, 51]]
        },
        {
          code: "CDM 211",
          course: "Film Semineri: Gölgede Kalan Sinema I",
          ects: "4",
          time: [[32, 33, 34]]
        },
        {
          code: "CDM 301",
          course: "Film Yapımı I",
          ects: "12",
          time: [[15, 16, 17, 18, 43, 44, 45, 46]]
        },
        {
          code: "CDM 310",
          course: "Korku Sineması",
          ects: "5",
          time: [[48, 49, 50]]
        },
        {
          code: "CDM 311",
          course: "Film Semineri: Gölgede Kalan Sinema III",
          ects: "4",
          time: [[60, 61, 62]]
        },
        {
          code: "CDM 330",
          course: "Psikanaliz ve Sinema",
          ects: "4",
          time: [[35, 36, 37]]
        },
        {
          code: "CDM 360",
          course: "Sinematografi, Mizansen ve Yönetmenlik",
          ects: "5",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "CDM 430",
          course: "Kadın Sineması",
          ects: "4",
          time: [[18, 19, 20]]
        },
        {
          code: "CDM 470",
          course: "Dijital Çağ’da Hareketli Görüntüler",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "CDM 480",
          course: "Stop Motion Animasyon",
          ects: "5",
          time: [[4, 5, 6, 7]]
        },
        {
          code: "CDM 497",
          course: "Bitirme Projesi I",
          ects: "10",
          time: [[36, 37, 71, 72, 73, 74]]
        },
        {
          code: "CDM 498",
          course: "Bitirme Projesi II",
          ects: "12",
          time: [[38, 39, 77, 78, 79, 80]]
        },
        {
          code: "CE 215",
          course: "Bilgisayar Bilimlerinde Ayrık Yapılar",
          ects: "6",
          time: [[7, 8, 9], [15, 16, 17]]
        },
        {
          code: "CE 221",
          course: "Veri Yapıları ve Algoritmalar I",
          ects: "7",
          time: [[4, 5, 6, 43, 44], [15, 16, 17, 47, 48], [4, 5, 6, 19, 20]]
        },
        {
          code: "CE 302",
          course: "Mikroişlemciler",
          ects: "8",
          time: [[15, 16, 45, 46], [15, 16, 47, 48]]
        },
        {
          code: "CE 303",
          course: "İşletim Sistemleri",
          ects: "8",
          time: [[19, 20, 21, 34, 35], [31, 32, 33, 57, 58]]
        },
        {
          code: "CE 308",
          course: "Hesaplama Kuramı",
          ects: "7",
          time: [[43, 44, 45], [61, 62, 63]]
        },
        {
          code: "CE 340",
          course: "Kriptografi ve Ağ Güvenliği",
          ects: "5",
          time: [[33, 34, 35]]
        },
        {
          code: "CE 350",
          course: "Linux Araçları ve Kabuk Programlama",
          ects: "5",
          time: [[15, 16, 17]]
        },
        {
          code: "CE 401",
          course: "Algoritma Tasarımı",
          ects: "5",
          time: [[5, 6, 7]]
        },
        {
          code: "CE 475",
          course: "Otomatik Öğrenme Temelleri ve Uygulamaları",
          ects: "7",
          time: [[15, 16, 37, 38]]
        },
        {
          code: "CE 490",
          course: "Dijital Görüntü İşlemeye Giriş",
          ects: "5",
          time: [[7, 8, 9]]
        },
        {
          code: "CG 101",
          course: "Çocuk Gelişimi I",
          ects: "6",
          time: [[29, 30, 31, 33, 34]]
        },
        {
          code: "CG 103",
          course: "Özel Eğitim I",
          ects: "6",
          time: [[5, 6, 7]]
        },
        {
          code: "CG 105",
          course: "Öğretim Teknolojileri ve Materyal Tasarımı",
          ects: "6",
          time: [[19, 20, 35, 36]]
        },
        {
          code: "CG 107",
          course: "Öğrenme ve Öğretme Teknikleri",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "CG 201",
          course: "Mesleki Eğitim ve Uygulama II",
          ects: "7",
          time: [[44, 45, 46, 47, 48, 58, 59, 60, 61, 62]]
        },
        {
          code: "CG 203",
          course: "Anne Çocuk Sağlığı ve İlkyardım",
          ects: "4",
          time: [[34, 35, 36]]
        },
        {
          code: "CG 205",
          course: "Çocuk ve Drama",
          ects: "5",
          time: [[15, 16, 29, 30]]
        },
        {
          code: "CG 207",
          course: "Okul Öncesi Dönemde Matematik Öğretimi",
          ects: "4",
          time: [[19, 20, 21]]
        },
        {
          code: "CG 212",
          course: "Çocuk Hakları ve Koruma",
          ects: "3",
          time: [[1, 2]]
        },
        {
          code: "CG 216",
          course: "Davranış Yönetimi",
          ects: "3",
          time: [[32, 33]]
        },
        {
          code: "CG 217",
          course: "Çocuk Edebiyatı ve Medya",
          ects: "3",
          time: [[5, 6]]
        },
        {
          code: "CHEM 100",
          course: "Genel Kimya",
          ects: "6",
          time: [[29, 30, 60, 61], [32, 33, 50, 51], [31, 32, 60, 61]]
        },
        {
          code: "CHN 101",
          course: "Çince I",
          ects: "4",
          time: [[33, 34, 35, 36]]
        },
        {
          code: "CHN 201",
          course: "Çince III",
          ects: "4",
          time: [[20, 21, 48, 49]]
        },
        {
          code: "CHN 301",
          course: "Çince V",
          ects: "4",
          time: [[17, 18, 57, 58]]
        },
        {
          code: "CHN 401",
          course: "Çince VII",
          ects: "4",
          time: [[6, 7, 45, 46]]
        },
        {
          code: "CIVE 201",
          course: "Mühendislik Mekaniği I: Statik",
          ects: "6",
          time: [[7, 8, 9], [1, 2, 3]]
        },
        {
          code: "CIVE 205",
          course: "Malzeme Bilimine Giriş",
          ects: "6",
          time: [[29, 30, 61, 62], [61, 62, 63, 64]]
        },
        {
          code: "CIVE 301",
          course: "Yapısal Analiz I",
          ects: "6",
          time: [[17, 18, 19], [57, 58, 59]]
        },
        {
          code: "CIVE 303",
          course: "Zemin Mekaniği I",
          ects: "5",
          time: [[5, 6, 36, 37], [15, 16, 46, 47], [8, 9, 64, 65]]
        },
        {
          code: "CIVE 305",
          course: "Hidromekanik",
          ects: "6",
          time: [[21, 22, 23, 30, 31], [2, 3, 32, 33, 34]]
        },
        {
          code: "CIVE 307",
          course: "Yapı Malzemeleri",
          ects: "5",
          time: [[44, 45, 46, 47], [36, 37, 48, 49]]
        },
        {
          code: "CIVE 410",
          course: "İleri Betonarme",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "CIVE 414",
          course: "Temel İnşaatı",
          ects: "6",
          time: [[20, 21, 22]]
        },
        {
          code: "CIVE 424",
          course: "Hidroloji ve Su Kaynakları",
          ects: "5",
          time: [[5, 6, 7]]
        },
        {
          code: "CIVE 430",
          course: "Akarsularda Katı Madde Taşınımı",
          ects: "5",
          time: [[33, 34, 35]]
        },
        {
          code: "CIVE 432",
          course: "Hidroloik Yapıları tasarımı",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "CIVE 438",
          course: "Beton Teknolojisi",
          ects: "5",
          time: [[16, 17, 18]]
        },
        {
          code: "CIVE 444",
          course: "Su İletim ve Dağıtım Sistemlerinin Tasarımı",
          ects: "5",
          time: [[43, 44, 45]]
        },
        {
          code: "CLM 101",
          course: "Hijyen ve Sanitasyon",
          ects: "6",
          time: [[32, 33, 34]]
        },
        {
          code: "CLM 103",
          course: "Mutfakla İlgili Kavram ve Beceriler",
          ects: "6",
          time: [[1, 2, 3, 4]]
        },
        {
          code: "CLM 203",
          course: "Sanat,Tasarım ve Gastronomi",
          ects: "3",
          time: [[20, 21, 22, 23]]
        },
        {
          code: "CLM 209",
          course: "Gıda Üretiminde Malzeme Bilgisi ve Satınalma",
          ects: "3",
          time: [[35, 61, 62]]
        },
        {
          code: "CLM 212",
          course: "Fırınlama Teknikleri",
          ects: "5",
          time: [[15, 16, 17, 18]]
        },
        {
          code: "CLM 301",
          course: "Profesyonel Beceri Laboratuvarı I",
          ects: "6",
          time: [[29, 30, 31, 32, 33, 34], [15, 16, 17, 18, 19, 20], [49, 50]]
        },
        {
          code: "CLM 305",
          course: "Türk Mutfağı",
          ects: "5",
          time: [[33, 34, 35, 36], [43, 44, 45, 46]]
        },
        {
          code: "CLM 309",
          course: "Pastacılık I",
          ects: "5",
          time: [[5, 6, 7, 8]]
        },
        {
          code: "CLM 320",
          course: "Gastronomik Terminoloji",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "CLM 400",
          course: "Şarap Bilimi",
          ects: "5",
          time: [[36, 37, 38]]
        },
        {
          code: "CLM 401",
          course: "Profesyonel Beceri Laboratuvarı III",
          ects: "8",
          time: [[43, 44, 45, 46, 47, 48], [57, 58, 59, 60, 61, 62]]
        },
        {
          code: "CLM 403",
          course: "Asya Mutfakları",
          ects: "5",
          time: [[35, 36, 37, 38]]
        },
        {
          code: "CLM 405",
          course: "Restoran Yönetimi",
          ects: "5",
          time: [[33, 34, 63], [35, 36, 64]]
        },
        {
          code: "CLM 410",
          course: "Ekmek Yapımı",
          ects: "5",
          time: [[5, 6, 7, 8]]
        },
        {
          code: "CLM 412",
          course: "Ziyafet Organizasyonu ve Yönetimi",
          ects: "5",
          time: [[21, 22, 23], [49, 50, 51]]
        },
        {
          code: "CLM 420",
          course: "İleri Pastacılık I",
          ects: "5",
          time: [[21, 22, 23, 24]]
        },
        {
          code: "CLM 432",
          course: "Yiyecek ve İçecek Servisi",
          ects: "6",
          time: [[60, 61, 62]]
        },
        {
          code: "CLM 436",
          course: "Çikolata",
          ects: "5",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "CLM 455",
          course: "Gida ve Içeceklerin Pazarlanmasi",
          ects: "5",
          time: [[21, 22, 23]]
        },
        {
          code: "CLM 497",
          course: "Araştırma ve Geliştirme Projesi",
          ects: "5",
          time: [[6, 7, 17, 18], [6, 7, 15, 16], [6, 7, 29, 30], [6, 7, 63, 64]]
        },
        {
          code: "DM 401",
          course: "Tasarım Projesi Yönetimi II",
          ects: "9",
          time: [[15, 16, 17, 57, 58, 59]]
        },
        {
          code: "DT 100",
          course: "Dış Ticarette Temel Kavramlar",
          ects: "6",
          time: [[4, 23, 24]]
        },
        {
          code: "DT 120",
          course: "Dış Ticarette Pazarlama Teknikleri",
          ects: "4",
          time: [[33, 34, 35]]
        },
        {
          code: "DT 201",
          course: "Gümrük İşlemleri",
          ects: "5",
          time: [[50, 51, 52]]
        },
        {
          code: "DT 203",
          course: "Tarımsal Ürünlerin İhracatı",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "DT 205",
          course: "Dış Ticarette Tutundurma",
          ects: "5",
          time: [[32, 33, 34]]
        },
        {
          code: "DT 207",
          course: "E-Ticaret Uygulamaları",
          ects: "3",
          time: [[64, 65, 66]]
        },
        {
          code: "DT 209",
          course: "Mesleki Gelişim Etkinlikleri I",
          ects: "2",
          time: [[21, 22]]
        },
        {
          code: "DT 215",
          course: "Uluslararası Satışlar ve Görüşmeler",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "DT 217",
          course: "Uluslararası Pazarlama",
          ects: "5",
          time: [[9, 10, 11]]
        },
        {
          code: "ECON 101",
          course: "Mikroekonominin İlkeleri",
          ects: "6",
          time: [[49, 50, 51], [43, 44, 45], [46, 47, 48]]
        },
        {
          code: "ECON 102",
          course: "Makroekonominin İlkeleri",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "ECON 211",
          course: "Mikroekonomi Teorisi I",
          ects: "6",
          time: [[6, 7, 8]]
        },
        {
          code: "ECON 301",
          course: "Ekonometri",
          ects: "6",
          time: [[57, 58, 59]]
        },
        {
          code: "ECON 303",
          course: "Para ve Banka",
          ects: "6",
          time: [[49, 50, 51]]
        },
        {
          code: "ECON 305",
          course: "Uluslararası Ekonomi I",
          ects: "6",
          time: [[33, 34, 35]]
        },
        {
          code: "ECON 401",
          course: "Türkiye Ekonomisi",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "ECON 450",
          course: "Kültürel Ekonomi",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "ECON 465",
          course: "Ekonomik Uygulamalar ile Veri Bilimine Giriş",
          ects: "6",
          time: [[19, 20, 21]]
        },
        {
          code: "EEE 201",
          course: "Elektrik Devreleri I",
          ects: "6",
          time: [
            [15, 16, 17, 34, 35],
            [15, 16, 17, 36, 37],
            [5, 6, 7, 32, 33],
            [5, 6, 7, 43, 44]
          ]
        },
        {
          code: "EEE 205",
          course: "Elektrik Devre Temelleri",
          ects: "5",
          time: [[22, 23, 35, 36], [4, 5, 19, 20]]
        },
        {
          code: "EEE 211",
          course: "Mühendisler için Hesaplamalı Programlama",
          ects: "4",
          time: [[3, 4, 22, 23], [8, 9, 64, 65]]
        },
        {
          code: "EEE 242",
          course: "Sayısal Tasarım",
          ects: "5",
          time: [[45, 46, 64, 65], [29, 30, 50, 51]]
        },
        {
          code: "EEE 281",
          course: "Mühendislik Matematiği I",
          ects: "6",
          time: [[19, 20, 32, 33]]
        },
        {
          code: "EEE 301",
          course: "İşaret İşleme ve Doğrusal Sistemler",
          ects: "7",
          time: [[1, 2, 3, 62, 63], [4, 5, 49, 50, 51]]
        },
        {
          code: "EEE 331",
          course: "Analog Elektronik",
          ects: "7",
          time: [[8, 9, 59, 60, 61], [19, 20, 21, 30, 31]]
        },
        {
          code: "EEE 411",
          course: "Kontrol Sistemleri",
          ects: "5",
          time: [[49, 50, 51], [50, 64, 65]]
        },
        {
          code: "EEE 424",
          course: "Antenler",
          ects: "5",
          time: [[33, 34, 59, 60]]
        },
        {
          code: "EEE 461",
          course: "Gömülü Sistem Tasarımı",
          ects: "6",
          time: [[1, 2, 17, 18]]
        },
        {
          code: "EEE 472",
          course: "Elektrik Enerjisi İletimi ve Dağıtımı",
          ects: "5",
          time: [[29, 30, 31]]
        },
        {
          code: "ENG 101",
          course: "İngilizcede Akademik Beceriler I",
          ects: "3",
          time: [
            [1, 2, 43, 44],
            [1, 2, 31, 32],
            [1, 2, 61, 62],
            [8, 9, 48, 49],
            [19, 20, 45, 46],
            [1, 2, 48, 49],
            [1, 2, 17, 18],
            [19, 20, 32, 33],
            [15, 16, 29, 30],
            [3, 4, 21, 22],
            [5, 6, 57, 58],
            [34, 35, 61, 62],
            [17, 18, 43, 44],
            [22, 23, 50, 51],
            [22, 23, 57, 58],
            [46, 47, 62, 63],
            [5, 6, 47, 48],
            [8, 9, 29, 30],
            [36, 37, 50, 51],
            [18, 19, 64, 65],
            [22, 23, 33, 34],
            [1, 2, 21, 22],
            [20, 21, 47, 48],
            [35, 36, 64, 65],
            [19, 20, 64, 65],
            [19, 20, 57, 58],
            [50, 51, 60, 61],
            [49, 50, 57, 58],
            [1, 2, 64, 65],
            [29, 30, 48, 49],
            [49, 50, 59, 60],
            [17, 18, 36, 37],
            [43, 44, 64, 65],
            [20, 21, 50, 51],
            [8, 9, 49, 50],
            [3, 4, 15, 16],
            [34, 35, 62, 63],
            [22, 23, 46, 47],
            [5, 6, 43, 44],
            [22, 23, 29, 30],
            [15, 16, 48, 49],
            [31, 32, 64, 65],
            [4, 5, 64, 65],
            [36, 37, 59, 60],
            [57, 58, 59, 60]
          ]
        },
        {
          code: "ENG 111",
          course: "Hukuk İngilizcesi I",
          ects: "3",
          time: [[1, 2, 63, 64]]
        },
        {
          code: "ENG 207",
          course: "Klinik İngilizce I",
          ects: "3",
          time: [[1, 2, 3]]
        },
        {
          code: "ENG 211",
          course: "Hukuk İngilizcesi III",
          ects: "5",
          time: [[36, 37, 43, 44]]
        },
        {
          code: "ENG 301",
          course: "Hukuk İngilizcesi V",
          ects: "3",
          time: [[3, 4, 15, 16]]
        },
        {
          code: "ENG 307",
          course: "Hemşirelikte İngilizce I",
          ects: "3",
          time: [[6, 7, 8]]
        },
        {
          code: "ENG 401",
          course: "Hukuk İngilizcesi VII",
          ects: "3",
          time: [[17, 18, 34, 35], [29, 30, 64, 65], [18, 19, 46, 47]]
        },
        {
          code: "ENG 410",
          course: "Kariyer Gelişimi İçin İngilizce",
          ects: "4",
          time: [
            [57, 58, 59],
            [62, 63, 64],
            [20, 21, 22],
            [59, 60, 61],
            [35, 36, 37],
            [43, 44, 45],
            [63, 64, 65],
            [7, 8, 9],
            [61, 62, 63],
            [32, 33, 34],
            [49, 50, 51],
            [6, 7, 8],
            [31, 32, 33],
            [5, 6, 7],
            [19, 20, 21],
            [46, 47, 48],
            [21, 22, 23],
            [3, 4, 5],
            [29, 30, 31],
            [15, 16, 17],
            [47, 48, 49]
          ]
        },
        {
          code: "ETI 100",
          course: "Edebiyatta Temel Kavramlar",
          ects: "6",
          time: [[4, 5, 6], [43, 44, 45]]
        },
        {
          code: "ETI 102",
          course: "Çeviriye Giriş I",
          ects: "6",
          time: [[35, 36, 37], [1, 2, 3], [61, 62, 63]]
        },
        {
          code: "ETI 120",
          course: "Dil ve Toplum",
          ects: "6",
          time: [[57, 58, 59], [29, 30, 31], [43, 44, 45]]
        },
        {
          code: "ETI 201",
          course: "Sözcükbilimi",
          ects: "5",
          time: [[32, 33, 34], [43, 44, 45]]
        },
        {
          code: "ETI 203",
          course: "Ekonomi Metinleri Çevirisi",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "ETI 250",
          course: "İngilizce-Türkçe Karşıtsal Çözümleme",
          ects: "4",
          time: [[49, 50, 51]]
        },
        {
          code: "ETI 301",
          course: "Çeviri Kuramı",
          ects: "5",
          time: [[18, 43, 44]]
        },
        {
          code: "ETI 304",
          course: "Hukuk Metinleri Çevirisi",
          ects: "5",
          time: [[29, 30, 31], [33, 34, 35]]
        },
        {
          code: "ETI 307",
          course: "Ardıl Çeviri I",
          ects: "5",
          time: [[1, 2, 3], [20, 21, 22]]
        },
        {
          code: "ETI 380",
          course: "Sözlü Çeviri Çalışmaları",
          ects: "5",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "ETI 425",
          course: "Çevirmenler için Profesyonel İletişim",
          ects: "5",
          time: [[34, 35, 36]]
        },
        {
          code: "ETI 430",
          course: "Bilgisayar Destekli Çeviri Çalışmaları",
          ects: "6",
          time: [[60, 61, 62], [60, 63, 64]]
        },
        {
          code: "ETI 436",
          course: "Metin Düzeltme ve Yayına Hazırlama",
          ects: "8",
          time: [[4, 5, 6]]
        },
        {
          code: "ETI 440",
          course: "Görsel-İşitsel Çeviri",
          ects: "5",
          time: [[7, 8, 9], [46, 47, 48]]
        },
        {
          code: "ETR 101",
          course: "E-Ticaret",
          ects: "5",
          time: [[22, 36, 37, 38]]
        },
        {
          code: "FA 111",
          course: "Moda Tasarımı için Çizim ve Sunum Teknikleri I",
          ects: "4",
          time: [[1, 2, 3, 4], [15, 16, 17, 18]]
        },
        {
          code: "FA 201",
          course: "Moda Tasarım Stüdyosu:Giriş",
          ects: "10",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "FA 203",
          course: "Moda Grafiği",
          ects: "4",
          time: [[32, 33, 34, 35]]
        },
        {
          code: "FA 205",
          course: "Giysi Tarihi",
          ects: "4",
          time: [[61, 62, 63]]
        },
        {
          code: "FA 207",
          course: "Kalıp Hazırlama ve Dikim Becerileri I",
          ects: "4",
          time: [[4, 5, 6, 7]]
        },
        {
          code: "FA 213",
          course: "Moda Tasarımcıları için Tekstil Materyalleri I",
          ects: "4",
          time: [[48, 49, 50]]
        },
        {
          code: "FA 301",
          course: "Moda Teorisi",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "FA 320",
          course: "İleri Teknik Çizim Teknikleri",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "FA 390",
          course: "Modada Marka İletişimi",
          ects: "4",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "FA 415",
          course: "Defile Organizasyonu ve Moda Koreografisi",
          ects: "4",
          time: [[33, 34, 35, 36]]
        },
        {
          code: "FA 423",
          course: "Moda Ürünleri ve Teknolojilerindeki Yenilikler",
          ects: "4",
          time: [[33, 34, 35, 36]]
        },
        {
          code: "FA 451",
          course: "Moda için Uygulama Atölyesi",
          ects: "1",
          time: [[33, 34]]
        },
        {
          code: "FB 403",
          course: "Moda Yönetimi Projesi II",
          ects: "9",
          time: [[3, 4, 5, 6, 20, 21]]
        },
        {
          code: "FD 301",
          course: "Moda Tasarım Stüdyosu:Koleksiyon II",
          ects: "7",
          time: [[6, 7, 8, 9, 48, 49, 50, 51]]
        },
        {
          code: "FD 303",
          course: "Tekstil Stüdyosu",
          ects: "3",
          time: [[57, 58, 59, 60]]
        },
        {
          code: "FD 313",
          course: "Bilgisayar Destekli Kalıp Hazırlama",
          ects: "4",
          time: [[15, 16, 17, 18]]
        },
        {
          code: "FD 401",
          course: "Moda Tasarım Stüdyosu:Koleksiyon IV",
          ects: "9",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "FD 498",
          course: "Bitirme Projesi",
          ects: "13",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "FE 201",
          course: "Genel Mikrobiyoloji",
          ects: "6",
          time: [[21, 22, 43, 44, 45]]
        },
        {
          code: "FE 211",
          course: "Madde ve Enerji Denklikleri",
          ects: "6",
          time: [[19, 20, 35, 36]]
        },
        {
          code: "FE 250",
          course: "Analitik Kimya",
          ects: "5",
          time: [[1, 2, 3, 8, 9]]
        },
        {
          code: "FE 251",
          course: "Termodinamik",
          ects: "5",
          time: [[4, 5, 29, 30]]
        },
        {
          code: "FE 301",
          course: "Isı Transferi",
          ects: "5",
          time: [[15, 16, 46, 47]]
        },
        {
          code: "FE 311",
          course: "Gıda Teknolojisi I",
          ects: "6",
          time: [[6, 7, 8, 48, 49]]
        },
        {
          code: "FE 312",
          course: "Gıda Teknolojisi II",
          ects: "6",
          time: [[57, 58, 59, 64, 65]]
        },
        {
          code: "FE 332",
          course: "Biyokimya",
          ects: "5",
          time: [[43, 44, 45]]
        },
        {
          code: "FE 360",
          course: "Enstrümental Analiz",
          ects: "5",
          time: [[15, 16, 43, 44]]
        },
        {
          code: "FENG 497",
          course: "Bitirme Projesi I",
          ects: "6",
          time: [[71, 72, 73, 74]]
        },
        {
          code: "FFD 101",
          course: "Sanat ve Tasarım Stüdyosu I",
          ects: "8",
          time: [[6, 7, 8, 9, 47, 48, 49, 50, 51]]
        },
        {
          code: "FFD 111",
          course: "Çizim ve Reprezantasyon",
          ects: "4",
          time: [[1, 2, 3, 4]]
        },
        {
          code: "FFD 121",
          course: "Sanat ve Tasarım Tarihi I",
          ects: "2",
          time: [[36, 37], [22, 23], [43, 44], [45, 46]]
        },
        {
          code: "FFD 201",
          course: "Bilgisayar Destekli Mimari Grafikler",
          ects: "5",
          time: [
            [62, 63, 64, 65],
            [43, 44, 45, 46],
            [21, 22, 23, 24],
            [5, 6, 7, 8],
            [34, 35, 36, 37]
          ]
        },
        {
          code: "FFD 301",
          course: "Mobilya Tasarımı",
          ects: "5",
          time: [[43, 44, 45, 46], [29, 30, 31, 32], [15, 16, 17, 18]]
        },
        {
          code: "FR 103",
          course: "Fransızca I",
          ects: "4",
          time: [
            [18, 19, 50, 51],
            [3, 4, 33, 34],
            [18, 19, 47, 48],
            [15, 16, 36, 37],
            [18, 19, 46, 47],
            [15, 16, 47, 48],
            [17, 18, 64, 65],
            [9, 10, 33, 34]
          ]
        },
        {
          code: "FR 104",
          course: "Fransızca II",
          ects: "4",
          time: [[3, 4, 45, 46]]
        },
        {
          code: "FR 201",
          course: "Fransızca III",
          ects: "4",
          time: [
            [22, 23, 57, 58],
            [22, 23, 47, 48],
            [18, 19, 43, 44],
            [4, 5, 34, 35],
            [22, 23, 48, 49]
          ]
        },
        {
          code: "FR 202",
          course: "Fransızca IV",
          ects: "4",
          time: [[4, 5, 57, 58]]
        },
        {
          code: "FR 301",
          course: "Fransızca V",
          ects: "4",
          time: [[6, 7, 59, 60]]
        },
        {
          code: "FR 312",
          course: "Profesyonel İletişim",
          ects: "4",
          time: [[21, 22, 23]]
        },
        {
          code: "FR 314",
          course: "Etkin Fransızca Bilgisi",
          ects: "4",
          time: [[32, 33, 34]]
        },
        {
          code: "FR 401",
          course: "Fransızca VII",
          ects: "4",
          time: [[8, 9, 36, 37]]
        },
        {
          code: "FR 410",
          course: "Fransızcanın Mutfakta Kullanımı",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "FR 413",
          course: "Sinema Yoluyla Fransızca İletişim",
          ects: "4",
          time: [[59, 60, 61]]
        },
        {
          code: "FYT 101",
          course: "Fizik Tedavi Yöntemleri ve Prensipleri I",
          ects: "4",
          time: [[4, 5, 15, 16, 17, 18]]
        },
        {
          code: "FYT 103",
          course: "Hidroterapi ve Balneoterapi",
          ects: "3",
          time: [[21, 22]]
        },
        {
          code: "FYT 105",
          course: "Egzersiz Fizyolojisi",
          ects: "3",
          time: [[29, 30]]
        },
        {
          code: "FYT 201",
          course: "Fizik Tedavi Yöntemleri ve Prensipleri III",
          ects: "12",
          time: [[4, 5, 6, 57, 58, 59, 60, 61, 62]]
        },
        {
          code: "FYT 203",
          course: "Hareket Sistemi Hastalıkları",
          ects: "4",
          time: [[19, 20]]
        },
        {
          code: "GBE 100",
          course: "Genel ve Moleküler Biyoloji",
          ects: "6",
          time: [[34, 35, 64, 65]]
        },
        {
          code: "GBE 201",
          course: "Mikrobiyal Biyoteknoloji",
          ects: "6",
          time: [[17, 18, 19, 20]]
        },
        {
          code: "GBE 303",
          course: "Biyotransport Olayları",
          ects: "6",
          time: [[61, 62, 63]]
        },
        {
          code: "GBE 305",
          course: "Protein Kimyası",
          ects: "6",
          time: [[47, 48, 64, 65]]
        },
        {
          code: "GBE 320",
          course: "Biyomühendisler için Biyokimya",
          ects: "5",
          time: [[43, 44, 45]]
        },
        {
          code: "GBE 401",
          course: "Hücre ve Doku Mühendisliği",
          ects: "6",
          time: [[15, 16, 47, 48, 49, 50]]
        },
        {
          code: "GBE 406",
          course: "Gen Kontrolü ve Epigenetik",
          ects: "6",
          time: [[31, 32, 59, 60]]
        },
        {
          code: "GD 303",
          course: "Yayın Tasarımı",
          ects: "4",
          time: [[1, 2, 3, 4]]
        },
        {
          code: "GD 304",
          course: "Ambalaj Tasarımı",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "GD 403",
          course: "Reklam Tasarımı ve Sanat Yönetmenliği",
          ects: "4",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "GEAR 211",
          course: "İletişim, Edebiyat ve Felsefe",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "GEAR 212",
          course: "Temel Fotoğrafçılık",
          ects: "6",
          time: [[35, 36, 37, 38]]
        },
        {
          code: "GEAR 213",
          course: "20. Yüzyıl Sanat Akımları ve Sanatçıları",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "GEAR 220",
          course: "Osmanlı Döneminden Modern Türkiye'ye Güzel Sanatlar",
          ects: "4",
          time: [[35, 36, 37]]
        },
        {
          code: "GEAR 301",
          course: "Çizim ve Sanata Giriş",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "GEAR 302",
          course: "Dünya Müzeleri",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "GEAR 303",
          course: "Filmlerde Giysiler",
          ects: "4",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "GEAR 305",
          course: "Türk Sineması",
          ects: "4",
          time: [[21, 22, 23], [7, 8, 9]]
        },
        {
          code: "GEAR 306",
          course: "Hollywood Sineması",
          ects: "4",
          time: [[21, 22, 23], [35, 36, 37]]
        },
        {
          code: "GEAR 307",
          course: "Çağdaş Dünya Sineması",
          ects: "4",
          time: [[57, 58, 59], [43, 44, 45]]
        },
        {
          code: "GEAR 322",
          course: "Evrensel Tasarım",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "GEEC 201",
          course: "İşletmeye Giriş",
          ects: "4",
          time: [[7, 8, 9], [29, 30, 31]]
        },
        {
          code: "GEEC 203",
          course: "Ekonominin İlkeleri",
          ects: "6",
          time: [[21, 22, 23], [43, 44, 45]]
        },
        {
          code: "GEEC 204",
          course: "Modern Dünya Ekonomisi",
          ects: "6",
          time: [[35, 36, 37], [57, 58, 59]]
        },
        {
          code: "GEEC 301",
          course: "Moda Endüstrisinin Dinamikleri",
          ects: "4",
          time: [[35, 36, 37, 38]]
        },
        {
          code: "GEET 202",
          course: "Çokkültürlülük ve Küreselleşme",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "GEET 304",
          course: "Etik Karar Verme",
          ects: "4",
          time: [[35, 36, 37], [43, 44, 45]]
        },
        {
          code: "GEET 309",
          course: "İş Sağlığı ve Güvenliği",
          ects: "5",
          time: [[21, 22, 23], [57, 58, 59]]
        },
        {
          code: "GEET 310",
          course: "Toplumsal Cinsiyet ve Medya",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "GEET 311",
          course: "İnsan Hakları Siyaseti",
          ects: "4",
          time: [[7, 8, 9]]
        },
        {
          code: "GEHU 203",
          course: "Çağdaş Dünya Tarihi",
          ects: "6",
          time: [[21, 22, 23]]
        },
        {
          code: "GEHU 204",
          course: "Temel Felsefe",
          ects: "6",
          time: [[7, 8, 9]]
        },
        {
          code: "GEHU 205",
          course: "Toplumsal Sorunlar",
          ects: "6",
          time: [[35, 36, 37], [57, 58, 59]]
        },
        {
          code: "GEHU 206",
          course: "İtalyan Kültürü",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "GEHU 209",
          course: "Uygarlık Tarihi I",
          ects: "6",
          time: [[29, 30, 31], [43, 44, 45]]
        },
        {
          code: "GEHU 303",
          course: "Ekoloji, Politika ve Gezegensel Düşünce",
          ects: "4",
          time: [[21, 22, 23]]
        },
        {
          code: "GEIN 304",
          course: "Uyg. Girişimcilik ve Yenilik Yönetimi",
          ects: "6",
          time: [
            [57, 58, 59, 60],
            [7, 8, 9, 10],
            [35, 36, 37, 38],
            [43, 44, 45, 46]
          ]
        },
        {
          code: "GEMC 203",
          course: "Bilgisayar ve Toplum",
          ects: "6",
          time: [[7, 8, 9]]
        },
        {
          code: "GENS 201",
          course: "Doğa Biliminin Temelleri",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "GENS 211",
          course: "Uzay Keşfi ve Toplum: Geçmiş, Mevcut ve Gelecek",
          ects: "5",
          time: [[7, 8, 9]]
        },
        {
          code: "GENS 212",
          course: "Astronomi Tarihi ve Felsefesi",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "GER 101",
          course: "Almanca I",
          ects: "4",
          time: [
            [46, 47, 57, 58],
            [8, 9, 45, 46],
            [32, 33, 45, 46],
            [18, 19, 50, 51],
            [1, 2, 18, 19],
            [17, 18, 62, 63],
            [6, 7, 64, 65],
            [36, 37, 64, 65],
            [15, 16, 50, 51],
            [36, 37, 57, 58],
            [6, 7, 47, 48],
            [15, 16, 29, 30],
            [19, 20, 59, 60],
            [5, 6, 57, 58],
            [8, 9, 62, 63],
            [17, 18, 34, 35],
            [15, 16, 64, 65],
            [7, 8, 35, 36],
            [3, 4, 35, 36],
            [29, 30, 57, 58],
            [23, 24, 33, 34]
          ]
        },
        {
          code: "GER 102",
          course: "Almanca II",
          ects: "4",
          time: [[1, 2, 29, 30]]
        },
        {
          code: "GER 111",
          course: "Turizm ve Otel Yönetimi Almanca Dersi I",
          ects: "4",
          time: [[32, 33, 47, 48]]
        },
        {
          code: "GER 201",
          course: "Almanca III",
          ects: "4",
          time: [
            [18, 19, 45, 46],
            [3, 4, 43, 44],
            [1, 2, 57, 58],
            [8, 9, 62, 63],
            [3, 4, 50, 51],
            [6, 7, 57, 58],
            [1, 2, 48, 49],
            [43, 44, 64, 65],
            [1, 2, 47, 48],
            [8, 9, 29, 30],
            [31, 32, 43, 44],
            [22, 23, 60, 61],
            [7, 8, 60, 61]
          ]
        },
        {
          code: "GER 202",
          course: "Almanca IV",
          ects: "4",
          time: [[19, 20, 62, 63]]
        },
        {
          code: "GER 301",
          course: "Almanca V",
          ects: "4",
          time: [[32, 33, 59, 60], [5, 6, 31, 32], [19, 20, 48, 49]]
        },
        {
          code: "GER 310",
          course: "İş Almancası",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "GER 320",
          course: "Alman Kültürü ve Sanatı",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "GER 401",
          course: "Almanca VII",
          ects: "4",
          time: [[4, 5, 21, 22]]
        },
        {
          code: "HBY 101",
          course: "Büro Yönetimi Teknikleri",
          ects: "6",
          time: [[18, 19, 20]]
        },
        {
          code: "HBY 201",
          course: "Mesleki Yazışma Uygulamaları",
          ects: "3",
          time: [[47, 48, 49]]
        },
        {
          code: "HBY 230",
          course: "İş Hukuku",
          ects: "5",
          time: [[21, 22, 23]]
        },
        {
          code: "HEM 103",
          course: "Sağlığın Temelleri I",
          ects: "12",
          time: [[5, 6, 7, 8, 57, 58, 59, 60]]
        },
        {
          code: "HEM 105",
          course: "Mesleki Temeller I",
          ects: "10",
          time: [[1, 2, 15, 16, 17, 18]]
        },
        {
          code: "HEM 207",
          course: "Sağlığın Temelleri III",
          ects: "7",
          time: [[17, 18, 20, 21, 22, 23]]
        },
        {
          code: "HEM 209",
          course: "Sağlığın Değerlendirilmesi",
          ects: "4",
          time: [[4, 5, 58, 59]]
        },
        {
          code: "HEM 211",
          course: "İç Hastalıkları Hemşireliği",
          ects: "5",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "HEM 213",
          course: "Cerrahi Hastalıkları Hemşireliği",
          ects: "5",
          time: [[34, 35, 36, 37]]
        },
        {
          code: "HEM 215",
          course:
            "İç Hastalıkları ve Cerrahi Hastalıkları Hemşireliği Uygulaması",
          ects: "6",
          time: [[48, 49, 50, 51, 61, 62, 63, 64]]
        },
        {
          code: "HEM 311",
          course: "Hemşirelikte Yönetim",
          ects: "4",
          time: [[57, 65, 66]]
        },
        {
          code: "HEM 313",
          course: "Geriatri ve Evde Bakım Hemşireliği",
          ects: "4",
          time: [[33, 34, 47, 48]]
        },
        {
          code: "HEM 315",
          course: "Hemşirelikte Yönetim Uygulaması",
          ects: "4",
          time: [[61, 62, 63, 64]]
        },
        {
          code: "HEM 317",
          course: "Sağlık Alanında Araştırma I",
          ects: "11",
          time: [[9, 10, 43, 44, 45, 46]]
        },
        {
          code: "HEM 319",
          course: "İlk ve Acil Yardım",
          ects: "4",
          time: [[4, 5, 49, 50]]
        },
        {
          code: "HEM 400",
          course: "Onkoloji Hemşireliği",
          ects: "4",
          time: [[20, 21, 22]]
        },
        {
          code: "HFS 100",
          course: "Yabancı Uyruklular için İnk. Tarihi",
          ects: "4",
          time: [[6, 7, 85, 86]]
        },
        {
          code: "HIM 101",
          course: "Sağlık Kurumları Yönetiminin Temelleri",
          ects: "6",
          time: [[46, 47, 48]]
        },
        {
          code: "HIM 103",
          course: "Doğa Biliminin Temelleri",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "HIM 203",
          course: "Tıbbi Terminoloji",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "HIM 205",
          course: "İlaç ve Toplum",
          ects: "6",
          time: [[3, 4, 5]]
        },
        {
          code: "HIM 301",
          course: "Sağlık Kurumlarında Finansal Yönetim",
          ects: "6",
          time: [[57, 58, 59]]
        },
        {
          code: "HIM 303",
          course: "Sağlık Kurumlarında İşlemler Yönetimi",
          ects: "6",
          time: [[46, 47, 48]]
        },
        {
          code: "HIM 305",
          course: "Sağlık Kurumlarında Halkla İlişkiler",
          ects: "5",
          time: [[63, 64, 65]]
        },
        {
          code: "HIM 401",
          course: "Alan Uygulaması",
          ects: "18",
          time: [
            [15, 16, 17, 18, 19, 20, 21, 22, 43, 44, 45, 46, 47, 48, 49, 50]
          ]
        },
        {
          code: "HIM 480",
          course: "Sağlık ve Yaşam",
          ects: "6",
          time: [[35, 36, 37]]
        },
        {
          code: "HINT 411",
          course: "Cerrahi Birimler Hemşireliği I",
          ects: "11",
          time: [[15, 16, 73, 74, 75, 76, 77, 78, 79, 80]]
        },
        {
          code: "HINT 413",
          course: "Dahili Birimler Hemşireliği I",
          ects: "11",
          time: [[17, 18, 71, 72]]
        },
        {
          code: "HIST 100",
          course: "Atatürk İlkeleri ve İnkılap Tarihi",
          ects: "4",
          time: [
            [9, 10, 79, 80],
            [11, 12, 81, 82],
            [32, 33, 74, 75],
            [47, 48, 89, 90],
            [49, 50, 91, 92],
            [36, 37, 78, 79]
          ]
        },
        {
          code: "HSP 101",
          course: "İnsan, Toplum ve Gezegen I",
          ects: "3",
          time: [[5, 6, 7]]
        },
        {
          code: "HSP 201",
          course: "İnsan, Toplum ve Gezegen III",
          ects: "4",
          time: [[19, 20, 21, 22]]
        },
        {
          code: "HSP 301",
          course: "İnsan, Toplum ve Gezegen V",
          ects: "2",
          time: [[61, 62]]
        },
        {
          code: "HUK 103",
          course: "Medeni Hukuka Giriş ve Kişiler Hukuku",
          ects: "5",
          time: [[32, 33, 34], [29, 30, 31]]
        },
        {
          code: "HUK 120",
          course: "Hukukun Temel İlkeleri",
          ects: "5",
          time: [[15, 16]]
        },
        {
          code: "HUK 201",
          course: "Borçlar Hukuku Genel Hükümler I",
          ects: "6",
          time: [[49, 50, 51], [4, 5, 6]]
        },
        {
          code: "HUK 203",
          course: "Ceza Hukuku Genel Hükümler I",
          ects: "5",
          time: [[35, 36, 37]]
        },
        {
          code: "HUK 204",
          course: "İdari Yargılama Hukuku",
          ects: "6",
          time: [[15, 16, 17], [18, 19, 20]]
        },
        {
          code: "HUK 205",
          course: "İdare Hukuku I",
          ects: "5",
          time: [[43, 44, 45], [46, 47, 48]]
        },
        {
          code: "HUK 207",
          course: "Uluslararası Kamu Hukuku",
          ects: "4",
          time: [[21, 22, 23], [32, 33, 34]]
        },
        {
          code: "HUK 221",
          course: "Vergi Hukuku",
          ects: "5",
          time: [[32, 33, 34]]
        },
        {
          code: "HUK 223",
          course: "İş ve Sosyal Güvenlik Hukuku",
          ects: "3",
          time: [[43, 44, 45]]
        },
        {
          code: "HUK 301",
          course: "Borçlar Özel Hukuku",
          ects: "5",
          time: [[15, 16, 17], [18, 19, 20]]
        },
        {
          code: "HUK 303",
          course: "Medeni Usul Hukuku I",
          ects: "5",
          time: [[4, 5, 6]]
        },
        {
          code: "HUK 305",
          course: "Ortaklıklar Hukuku",
          ects: "4",
          time: [[63, 64, 65]]
        },
        {
          code: "HUK 307",
          course: "Eşya Hukuku I",
          ects: "4",
          time: [[46, 47, 48], [49, 50, 51]]
        },
        {
          code: "HUK 310",
          course: "Sosyal Haklar",
          ects: "4",
          time: [[35, 36, 37]]
        },
        {
          code: "HUK 350",
          course: "Uluslararası Ceza Hukuku",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "HUK 401",
          course: "İş Hukuku I",
          ects: "4",
          time: [[32, 33, 34], [60, 61, 62]]
        },
        {
          code: "HUK 403",
          course: "Ceza Usul Hukuku I",
          ects: "4",
          time: [[43, 44, 45], [46, 47, 48]]
        },
        {
          code: "HUK 405",
          course: "Deniz Ticaret Hukuku",
          ects: "4",
          time: [[57, 58, 59], [49, 50, 51]]
        },
        {
          code: "HUK 411",
          course: "İcra ve İflas Hukuku I",
          ects: "4",
          time: [[7, 8, 9], [1, 2, 3]]
        },
        {
          code: "HUK 450",
          course: "Kamu İcra Hukuku",
          ects: "5",
          time: [[4, 5, 6]]
        },
        {
          code: "HUK 451",
          course: "Mahkeme Uygulamaları I",
          ects: "4",
          time: [[20, 21, 22]]
        },
        {
          code: "HUK 466",
          course: "Toplu İş Hukuku",
          ects: "4",
          time: [[21, 22, 23]]
        },
        {
          code: "HUK 479",
          course: "Bankacılık Hukuku",
          ects: "4",
          time: [[35, 36, 37]]
        },
        {
          code: "HUK 483",
          course:
            "Türk Vatandaşlık ve Yabancılar Hukukundaki Güncel Gelişmeler",
          ects: "5",
          time: [[43, 44, 45]]
        },
        {
          code: "HUK 489",
          course: "Sosyal Güvenlik Hukuku",
          ects: "4",
          time: [[46, 47, 48]]
        },
        {
          code: "HUK 491",
          course: "Vergi Hukuku Özel Hükümler",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "HUM 103",
          course: "Sosyal Bilimin İlkeleri I",
          ects: "6",
          time: [[29, 30, 58]]
        },
        {
          code: "HYHY 101",
          course: "Sivil Havacılığa Giriş",
          ects: "3",
          time: [[4, 5, 6]]
        },
        {
          code: "HYHY 105",
          course: "Yer Hizmetlerine Giriş",
          ects: "4",
          time: [[32, 33, 34]]
        },
        {
          code: "HYHY 201",
          course: "Havacılıkta Rezervasyon ve Bilet Satışı",
          ects: "3",
          time: [[17, 18, 19]]
        },
        {
          code: "HYHY 203",
          course: "Havayolu Kargo ve Lojistik Yönetimi",
          ects: "5",
          time: [[63, 64, 65]]
        },
        {
          code: "HYHY 205",
          course: "Seyrüsefer ve Hava Trafik Kuralları",
          ects: "4",
          time: [[45, 46]]
        },
        {
          code: "HYHY 207",
          course: "Havacılıkta Stratejik Yönetim",
          ects: "4",
          time: [[43, 44]]
        },
        {
          code: "HYHY 209",
          course: "Müşteri İlişkileri Yönetimi",
          ects: "5",
          time: [[60, 61, 62]]
        },
        {
          code: "HYHY 220",
          course: "İkram ve Servis Hizmetleri",
          ects: "4",
          time: [[22, 23]]
        },
        {
          code: "IA 301",
          course: "İç Mimarlık Stüdyosu I",
          ects: "9",
          time: [[5, 6, 7, 8, 47, 48, 49, 50]]
        },
        {
          code: "IA 401",
          course: "Düşsel ve Geleceğe Yönelik İç Mimarlık Çalışmaları",
          ects: "11",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "IA 494",
          course: "Bitirme Tezi",
          ects: "6",
          time: [[49, 50, 51, 52]]
        },
        {
          code: "IA 498",
          course: "Bitirme Projesi",
          ects: "10",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "IAED 101",
          course: "İç Mekanları Duyumsama",
          ects: "4",
          time: [[62, 63, 64, 65]]
        },
        {
          code: "IAED 201",
          course: "Tasarım Stüdyosu I",
          ects: "8",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "IAED 203",
          course: "Yapım ve Malzemeler I",
          ects: "3",
          time: [[32, 33, 34]]
        },
        {
          code: "IAED 207",
          course:
            "İç Mimarlık ve Çevre Tasarımı için Çevresel Kontrol Sistemleri",
          ects: "3",
          time: [[29, 30, 31], [47, 48, 49]]
        },
        {
          code: "IAED 209",
          course: "İç Mekan Tasarımı Tarihi ve Teorisi",
          ects: "3",
          time: [[1, 2, 3], [43, 44, 45]]
        },
        {
          code: "IAED 330",
          course: "Denizel İç Yapılar ve Malzemeler",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "IAED 342",
          course: "Sayısal Fotoğraf",
          ects: "4",
          time: [[6, 7, 8, 9]]
        },
        {
          code: "IAED 352",
          course: "Konut Çalışmalarına Giriş",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "IAED 401",
          course: "Restorasyon ve Koruma Çalışmalarına Giriş",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "IAED 403",
          course: "Ekolojik ve Biyo-İklimsel Tasarım",
          ects: "4",
          time: [[47, 48, 49]]
        },
        {
          code: "IAED 430",
          course: "Akıllı ve Etkileşimli Mekanlar",
          ects: "4",
          time: [[20, 21, 22]]
        },
        {
          code: "IAED 450",
          course: "İç Mekan Tekstilleri",
          ects: "4",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "IAED 451",
          course: "İç Mimarlık ve Çevre Tasarımı İçin Uygulama Atölyesi",
          ects: "1",
          time: [[33, 34]]
        },
        {
          code: "IAED 460",
          course: "Güncel Peyzaja Giriş",
          ects: "4",
          time: [[34, 35, 36]]
        },
        {
          code: "IAY 101",
          course: "Acil Hasta Bakımı I",
          ects: "5",
          time: [[1, 2, 29, 30]]
        },
        {
          code: "IAY 103",
          course: "Acil Sağlık Hizmetleri",
          ects: "3",
          time: [[33, 34]]
        },
        {
          code: "IAY 105",
          course: "Resüsitasyon (Temel Yaşam Desteği)",
          ects: "3",
          time: [[3, 4, 36, 37]]
        },
        {
          code: "IAY 117",
          course: "Beden Eğitimi ve Vücut Geliştirme I",
          ects: "3",
          time: [[5, 6, 49, 50]]
        },
        {
          code: "IAY 120",
          course: "Acil Sağlık Hizmetleri Operasyonları",
          ects: "3",
          time: [[3, 4]]
        },
        {
          code: "IAY 201",
          course: "Acil Hasta Bakımı III",
          ects: "7",
          time: [[6, 7, 71, 72, 73, 74]]
        },
        {
          code: "IAY 203",
          course: "Mesleki Uygulama I",
          ects: "7",
          time: [[47, 48, 49, 50, 75, 76, 77, 78]]
        },
        {
          code: "IAY 205",
          course: "Beden Eğitimi ve Vücut Geliştirme III",
          ects: "2",
          time: [[15, 16]]
        },
        {
          code: "ID 101",
          course: "Endüstriyel Tasarımda Eskiz ve Tarama Teknikleri",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "ID 201",
          course: "Ürün Tasarım Stüdyosu I",
          ects: "10",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "ID 203",
          course: "Bilgisayar Destekli Endüstriyel Tasarım",
          ects: "4",
          time: [[3, 4, 5, 6], [6, 7, 8, 9]]
        },
        {
          code: "ID 205",
          course: "İnsan Faktörleri",
          ects: "4",
          time: [[43, 44]]
        },
        {
          code: "ID 207",
          course: "Endüstriyel Tasarım için Malzeme Bilgisi",
          ects: "4",
          time: [[19, 20, 21]]
        },
        {
          code: "ID 301",
          course: "Endüstriyel Tasarım Tarihi ve Teorisi",
          ects: "4",
          time: [[63, 64, 65]]
        },
        {
          code: "ID 303",
          course: "Ürün Tasarım Stüdyosu III",
          ects: "9",
          time: [[5, 6, 7, 8, 47, 48, 49, 50]]
        },
        {
          code: "ID 320",
          course: "3 Boyutlu Mekanik Tasarım",
          ects: "4",
          time: [[20, 21, 22, 23]]
        },
        {
          code: "ID 330",
          course: "Kil ve Alçı ile Tasarım",
          ects: "4",
          time: [[48, 49, 50, 51]]
        },
        {
          code: "ID 331",
          course: "Kil ve Alçı ile Gelişmiş Tasarım",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "ID 400",
          course: "Fantastik Tasarım İllustrasyonu",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "ID 420",
          course: "Ürün Fotoğrafcılığı",
          ects: "4",
          time: [[1, 2, 3, 4]]
        },
        {
          code: "ID 451",
          course: "Endüstriyel Tasarım İçin Uygulama Atölyesi",
          ects: "1",
          time: [[33, 34]]
        },
        {
          code: "ID 494",
          course: "Bitirme Tezi",
          ects: "4",
          time: [[75, 76, 77, 78]]
        },
        {
          code: "IE 251",
          course: "Optimizasyon I",
          ects: "6",
          time: [
            [33, 34, 45, 46],
            [15, 16, 31, 32],
            [33, 34, 61, 62],
            [15, 16, 64, 65]
          ]
        },
        {
          code: "IE 323",
          course: "Üretim Planlama,Tasarım ve Kontrol",
          ects: "6",
          time: [[29, 30, 31], [15, 16, 17]]
        },
        {
          code: "IE 325",
          course: "Tedarik Zincirlerinin Modellenmesi ve Analizi",
          ects: "5",
          time: [[47, 48, 49]]
        },
        {
          code: "IE 329",
          course: "Yalın Üretim",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "IE 334",
          course: "Kalite Güvence ve Güvenilirlik",
          ects: "7",
          time: [[1, 2, 3], [61, 62, 63]]
        },
        {
          code: "IE 344",
          course: "Kalite Maliyetleri",
          ects: "5",
          time: [[19, 20, 21]]
        },
        {
          code: "IE 345",
          course: "Teknolojide Yenilikçilik",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "IE 346",
          course: "Mühendislik Ekonomisi",
          ects: "5",
          time: [[34, 35, 36]]
        },
        {
          code: "IE 353",
          course: "Optimizasyon III",
          ects: "8",
          time: [[19, 20, 21], [33, 34, 35]]
        },
        {
          code: "IE 371",
          course: "Mühendislik Sistem Analizi",
          ects: "6",
          time: [[34, 35, 36]]
        },
        {
          code: "IE 372",
          course: "Proje Yönetimi",
          ects: "5",
          time: [[5, 6, 7]]
        },
        {
          code: "IE 376",
          course: "SAP ile Kurumsal Kaynak Planlaması",
          ects: "5",
          time: [[29, 30, 31], [43, 44, 45]]
        },
        {
          code: "IE 444",
          course: "Mühendislik ve Bilişim Etiği",
          ects: "4",
          time: [[61, 62, 63]]
        },
        {
          code: "ING 101",
          course: "İngilizce I",
          ects: "3",
          time: [
            [2, 3, 4],
            [46, 47, 48],
            [1, 2, 3],
            [35, 36, 37],
            [63, 64, 65],
            [17, 18, 19],
            [34, 35, 36],
            [33, 34, 35],
            [49, 50, 51],
            [15, 16, 17],
            [6, 7, 8],
            [4, 5, 6],
            [59, 60, 61],
            [43, 44, 45],
            [60, 61, 62],
            [21, 22, 23],
            [62, 63, 64],
            [32, 33, 34],
            [7, 8, 9],
            [19, 20, 21],
            [29, 30, 31],
            [30, 31, 32],
            [57, 58, 59],
            [18, 19, 20]
          ]
        },
        {
          code: "ING 105",
          course: "İngilizcede Akademik Beceriler I",
          ects: "3",
          time: [[46, 47, 48, 49]]
        },
        {
          code: "ING 210",
          course: "Kabin Hizmetleri için Havacılık İngilizcesi I",
          ects: "2",
          time: [[49, 50, 51]]
        },
        {
          code: "ING 215",
          course: "Uluslararası Ticaret İngilizcesi",
          ects: "3",
          time: [[18, 19, 20]]
        },
        {
          code: "ING 225",
          course: "İleri İngilizceye Geçiş",
          ects: "3",
          time: [[43, 44, 45]]
        },
        {
          code: "ING 230",
          course: "Yer Hizmetleri için Havacılık İngilizcesi I",
          ects: "2",
          time: [[47, 48, 59]]
        },
        {
          code: "ING 250",
          course: "Turizm için İngilizce I",
          ects: "2",
          time: [[15, 16, 49]]
        },
        {
          code: "INS 301",
          course: "Sigortacılığa Giriş",
          ects: "4",
          time: [[36, 37, 38]]
        },
        {
          code: "INS 411",
          course: "Aktüerya Bilimi",
          ects: "6",
          time: [[45, 46, 47]]
        },
        {
          code: "ITF 210",
          course: "Finansal Kurumlar ve Piyasalar",
          ects: "5",
          time: [[15, 34, 35]]
        },
        {
          code: "ITF 223",
          course: "Uluslararası Ticari İşlemler",
          ects: "6",
          time: [[49, 50, 51]]
        },
        {
          code: "ITF 301",
          course: "Uluslararası Finans",
          ects: "8",
          time: [[31, 32, 33]]
        },
        {
          code: "ITF 304",
          course: "Finansta Sayısal Yöntemler",
          ects: "6",
          time: [[5, 6, 7]]
        },
        {
          code: "ITF 311",
          course: "İşletme Finansmanı",
          ects: "6",
          time: [[4, 5, 6], [57, 58, 59]]
        },
        {
          code: "ITF 401",
          course: "Uygulamalı Piyasa Analizi",
          ects: "5",
          time: [[34, 35, 36]]
        },
        {
          code: "ITF 404",
          course: "Yatırım Analizi ve Portföy Yönetimi",
          ects: "6",
          time: [[18, 19, 20], [63, 64, 65]]
        },
        {
          code: "ITF 407",
          course: "Gelişmekte Olan Ülke Piyasaları",
          ects: "5",
          time: [[19, 20, 21]]
        },
        {
          code: "ITF 408",
          course: "Türkiye'de Dış Ticaret ve Yatırım Politikaları",
          ects: "6",
          time: [[1, 2, 3]]
        },
        {
          code: "ITF 409",
          course: "Çok Uluslu Şirketler ve Yabancı Yatırımlar",
          ects: "5",
          time: [[47, 48, 49]]
        },
        {
          code: "ITF 413",
          course: "Davranışsal Finansa Giriş",
          ects: "4",
          time: [[22, 23, 24]]
        },
        {
          code: "ITF 414",
          course: "Finansmanda Özellikli Konular",
          ects: "5",
          time: [[59, 60, 61]]
        },
        {
          code: "ITL 103",
          course: "İtalyanca I",
          ects: "4",
          time: [
            [50, 51, 64, 65],
            [29, 30, 48, 49],
            [8, 9, 43, 44],
            [45, 46, 59, 60],
            [18, 19, 61, 62],
            [34, 35, 64, 65],
            [34, 35, 50, 51],
            [22, 23, 36, 37],
            [22, 23, 29, 30],
            [22, 23, 34, 35],
            [32, 33, 48, 49],
            [33, 34, 36, 37],
            [1, 2, 33, 34],
            [4, 5, 50, 51],
            [6, 7, 36, 37]
          ]
        },
        {
          code: "ITL 104",
          course: "İtalyanca II",
          ects: "4",
          time: [[22, 23, 31, 32]]
        },
        {
          code: "ITL 201",
          course: "İtalyanca III",
          ects: "4",
          time: [
            [20, 21, 59, 60],
            [6, 7, 61, 62],
            [36, 37, 60, 61],
            [29, 30, 57, 58],
            [20, 21, 36, 37],
            [5, 6, 64, 65],
            [17, 18, 48, 49]
          ]
        },
        {
          code: "ITL 202",
          course: "İtalyanca IV",
          ects: "4",
          time: [[7, 8, 50, 51]]
        },
        {
          code: "ITL 301",
          course: "İtalyanca V",
          ects: "4",
          time: [[1, 2, 43, 44], [3, 4, 57, 58], [19, 20, 59, 60]]
        },
        {
          code: "ITL 310",
          course: "İtalyan Kültürü ve Sanatı",
          ects: "4",
          time: [[16, 17, 18]]
        },
        {
          code: "ITL 320",
          course: "İtalyanca Temel Düzeyde Sınav Hazırlığı",
          ects: "4",
          time: [[21, 22, 23]]
        },
        {
          code: "ITL 330",
          course: "İtalyanca Sözlü Anlatım Becerileri",
          ects: "4",
          time: [[17, 18, 19]]
        },
        {
          code: "ITL 401",
          course: "İtalyanca VII",
          ects: "4",
          time: [[29, 30, 62, 63], [31, 32, 45, 46]]
        },
        {
          code: "JPN 101",
          course: "Japonca I",
          ects: "4",
          time: [[3, 4, 46, 47]]
        },
        {
          code: "JPN 201",
          course: "Japonca III",
          ects: "4",
          time: [[7, 8, 29, 30]]
        },
        {
          code: "JPN 301",
          course: "Japonca V",
          ects: "4",
          time: [[19, 20, 49, 50]]
        },
        {
          code: "JPN 401",
          course: "Japonca VII",
          ects: "4",
          time: [[32, 33, 62, 63]]
        },
        {
          code: "LAW 101",
          course: "Hukuka Giriş",
          ects: "8",
          time: [[4, 5, 6], [49, 50, 51]]
        },
        {
          code: "LAW 103",
          course: "Anayasa Hukukuna Giriş",
          ects: "6",
          time: [[57, 58, 59], [62, 63, 64]]
        },
        {
          code: "LAW 202",
          course: "Anglo-Sakson Hukuk Sistemi",
          ects: "5",
          time: [[43, 44, 45], [18, 19, 20]]
        },
        {
          code: "LAW 290",
          course: "Ekonomi Hukuku",
          ects: "6",
          time: [[57, 58, 59]]
        },
        {
          code: "LAW 300",
          course: "İşletme Hukuku",
          ects: "5",
          time: [[18, 19, 20]]
        },
        {
          code: "LAW 325",
          course: "Sağlık Hukuku",
          ects: "5",
          time: [[15, 16, 17]]
        },
        {
          code: "LAW 330",
          course: "Uluslararası Deniz Hukuku",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "LAW 335",
          course: "Enerji Hukuku",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "LAW 355",
          course: "Türk Vergi Sistemi",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "LAW 470",
          course: "Avrupa Birliği Hukuku",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "LAW 472",
          course: "Uluslararası İnsancıl Hukuk",
          ects: "4",
          time: [[60, 61, 62]]
        },
        {
          code: "LOG 101",
          course: "Lojistik İlkeleri I",
          ects: "5",
          time: [[3, 4, 18, 19]]
        },
        {
          code: "LOG 301",
          course: "Lojistik Planlama ve Modelleme I",
          ects: "6",
          time: [[20, 21, 22, 23]]
        },
        {
          code: "LOG 312",
          course: "Lojistikte Simülasyon",
          ects: "6",
          time: [[10, 15, 16, 17], [9, 29, 30, 31]]
        },
        {
          code: "LOG 401",
          course: "Satınalma ve Envanter Yönetimi",
          ects: "5",
          time: [[63, 64, 65]]
        },
        {
          code: "LOG 406",
          course: "Depo Yönetimi",
          ects: "6",
          time: [[58, 59, 60]]
        },
        {
          code: "LOG 416",
          course: "Uluslararası Karayolu Yük Taşımacılığı",
          ects: "6",
          time: [[2, 3, 4]]
        },
        {
          code: "LOG 422",
          course: "Gemi Acenteliği ve Yük Aracılığı İş Yönetimi",
          ects: "5",
          time: [[29, 30, 31]]
        },
        {
          code: "LOG 426",
          course: "Küresel Lojistik Yönetimi",
          ects: "6",
          time: [[16, 17, 18]]
        },
        {
          code: "LOG 440",
          course: "Perakende Yönetimi",
          ects: "6",
          time: [[6, 7, 8]]
        },
        {
          code: "LOG 448",
          course: "Tedarik Zincirinde Risk Yönetimi",
          ects: "5",
          time: [[44, 45, 46]]
        },
        {
          code: "LOG 451",
          course: "Lojistikte Uygulamalı Atölye I",
          ects: "2",
          time: [[48, 49]]
        },
        {
          code: "LOG 472",
          course: "İnsani Lojistik ve Tedarik Zinciri Yönetimi",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "LOG 497",
          course: "Bitirme Projesi I",
          ects: "5",
          time: [[33, 34, 35, 85]]
        },
        {
          code: "MATH 101",
          course: "Genel Matematik I",
          ects: "6",
          time: [[29, 30, 31], [60, 61, 62], [61, 62, 63], [63, 64, 65]]
        },
        {
          code: "MATH 103",
          course: "Matematiğin Temelleri",
          ects: "6",
          time: [[17, 18, 19]]
        },
        {
          code: "MATH 105",
          course: "Lineer Cebir I",
          ects: "6",
          time: [[34, 35, 36]]
        },
        {
          code: "MATH 107",
          course: "Matematik ve İstatistiğe Giriş",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "MATH 109",
          course: "Analiz I",
          ects: "6",
          time: [[29, 30, 43, 44]]
        },
        {
          code: "MATH 111",
          course: "Temel Matematik",
          ects: "6",
          time: [[7, 8, 9], [15, 16, 17]]
        },
        {
          code: "MATH 150",
          course: "Araştırma Yöntemleri ve Bioistatistik",
          ects: "6",
          time: [[45, 46, 47]]
        },
        {
          code: "MATH 153",
          course: "Genel Matematik I",
          ects: "6",
          time: [
            [1, 2, 19, 20],
            [17, 18, 46, 47],
            [19, 20, 46, 47],
            [19, 20, 62, 63],
            [17, 18, 48, 49],
            [1, 2, 17, 18]
          ]
        },
        {
          code: "MATH 201",
          course: "İleri Analiz I",
          ects: "5",
          time: [[21, 22, 45, 46]]
        },
        {
          code: "MATH 203",
          course: "Olasılık Teorisine Giriş I",
          ects: "6",
          time: [[15, 16, 48, 49]]
        },
        {
          code: "MATH 207",
          course: "Diferansiyel Denklemlere Giriş I",
          ects: "5",
          time: [[17, 18, 49, 50], [33, 34, 50, 51]]
        },
        {
          code: "MATH 240",
          course: "Mühendisler için Olasılık",
          ects: "6",
          time: [[60, 61, 62], [61, 62, 63], [63, 64, 65]]
        },
        {
          code: "MATH 250",
          course: "Mühendisler İçin Doğrusal Cebir ve Türevsel Denkl.",
          ects: "6",
          time: [[49, 50, 51], [21, 22, 23]]
        },
        {
          code: "MATH 280",
          course: "Olasılık ve İstatistiğe Giriş",
          ects: "6",
          time: [
            [5, 6, 62, 63],
            [1, 2, 32, 33],
            [47, 48, 57, 58],
            [5, 6, 64, 65],
            [1, 2, 34, 35],
            [47, 48, 59, 60]
          ]
        },
        {
          code: "MATH 301",
          course: "Fonksiyonel Analiz I",
          ects: "6",
          time: [[78, 79, 80]]
        },
        {
          code: "MATH 303",
          course: "Kompleks Analiz",
          ects: "7",
          time: [[43, 44, 45]]
        },
        {
          code: "MATH 305",
          course: "Optimizasyon",
          ects: "7",
          time: [[60, 61, 62]]
        },
        {
          code: "MATH 307",
          course: "Stokastik Süreçlere Giriş I",
          ects: "6",
          time: [[19, 20, 21]]
        },
        {
          code: "MATH 311",
          course: "Ayrık Matematik",
          ects: "7",
          time: [[6, 7, 8]]
        },
        {
          code: "MATH 403",
          course: "Nümerik Analiz I",
          ects: "6",
          time: [[33, 34, 35]]
        },
        {
          code: "MATH 462",
          course: "Uygulamalı İstatistik",
          ects: "7",
          time: [[20, 21, 22]]
        },
        {
          code: "MATU 101",
          course: "Ayakkabı Malzeme Bilgisi",
          ects: "4",
          time: [[22, 23, 59, 60]]
        },
        {
          code: "MATU 105",
          course: "Ayak Anatomisi ve Ergonomi",
          ects: "5",
          time: [[57, 58]]
        },
        {
          code: "MATU 109",
          course: "Temel Sanat Eğitimi I",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "MATU 201",
          course: "Tasarım Yönetimine Giriş",
          ects: "5",
          time: [[61, 62]]
        },
        {
          code: "MATU 203",
          course: "Bilgisayarda Çizim Teknikleri II",
          ects: "5",
          time: [[9, 10]]
        },
        {
          code: "MATU 205",
          course: "Bilgisayarda Stampa Yapımı I",
          ects: "5",
          time: [[7, 8, 65, 66]]
        },
        {
          code: "MATU 207",
          course: "Bilgisayarda Ürün Tasarımı I",
          ects: "5",
          time: [[49, 50, 51, 52]]
        },
        {
          code: "MATU 209",
          course: "Ürün Geliştirme ve Koleksiyon Hazırlama I",
          ects: "5",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "MBP 101",
          course: "Veri Tabanı I",
          ects: "5",
          time: [[3, 4]]
        },
        {
          code: "MBP 103",
          course: "Web Tasarımının Temelleri",
          ects: "7",
          time: [[8, 9, 10]]
        },
        {
          code: "MBP 105",
          course: "Programlama Temelleri",
          ects: "7",
          time: [[32, 33]]
        },
        {
          code: "MBP 201",
          course: "İnternet Programcılığı II",
          ects: "5",
          time: [[1, 2, 15, 16]]
        },
        {
          code: "MBP 203",
          course: "Veri Tabanı ve Yönetimi",
          ects: "5",
          time: [[5, 6, 19, 20], [10, 11, 43, 44]]
        },
        {
          code: "MBP 205",
          course: "Nesne Tabanlı Programlama II",
          ects: "5",
          time: [[17, 18, 59, 60], [15, 16, 61, 62]]
        },
        {
          code: "MBP 207",
          course: "Görsel Programlama II",
          ects: "5",
          time: [[48, 49, 57, 58], [7, 8, 21, 22]]
        },
        {
          code: "MBP 211",
          course: "Ağ Temelleri",
          ects: "3",
          time: [[35, 36, 49, 50]]
        },
        {
          code: "MBP 221",
          course: "Mobil Uygulamalar ve Teknolojiler",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "MCE 102",
          course: "Mekatronik Mühendisliğine Giriş",
          ects: "6",
          time: [[4, 5, 35, 36]]
        },
        {
          code: "MCE 302",
          course: "Mekatronik Sistem Tasarımı",
          ects: "6",
          time: [[15, 16, 46, 47]]
        },
        {
          code: "MCE 303",
          course: "Algılayıcılar ve Dönüştürücüler",
          ects: "5",
          time: [[4, 5, 45, 46]]
        },
        {
          code: "MCE 310",
          course: "Sistem Dinamiği ve Kontrol",
          ects: "5",
          time: [[18, 19, 20, 32]]
        },
        {
          code: "MCE 320",
          course: "Isı ve Akışkan Mühendisliğine Giriş",
          ects: "5",
          time: [[33, 34, 64, 65]]
        },
        {
          code: "MCE 412",
          course: "Otonom Robotik",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "MCS 104",
          course: "İletişim, Edebiyat ve Felsefe",
          ects: "5",
          time: [[43, 44, 45]]
        },
        {
          code: "MCS 111",
          course: "Medya Kültür ve Toplum I",
          ects: "6",
          time: [[29, 30, 31, 50, 51]]
        },
        {
          code: "MCS 260",
          course: "Medyada Yapım I",
          ects: "4",
          time: [[2, 3, 4]]
        },
        {
          code: "MCS 270",
          course: "Medya ve Siyaset I",
          ects: "7",
          time: [[21, 22, 23, 64, 65]]
        },
        {
          code: "MCS 402",
          course: "İletişimde Dil ve Diksiyon",
          ects: "4",
          time: [[43, 44, 45], [57, 58, 59], [61, 62, 63]]
        },
        {
          code: "MCS 404",
          course: "Küreselleşme ve Medya",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "MCS 422",
          course: "Medya Endüstrileri",
          ects: "4",
          time: [[61, 62, 63]]
        },
        {
          code: "MCS 441",
          course: "Sinemada Müzik ve Ses Tasarımı",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "MCS 447",
          course: "Ses Yapımı",
          ects: "4",
          time: [[49, 50, 51, 52]]
        },
        {
          code: "MCS 450",
          course: "Gündelik Hayat ve İletişim",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "MCS 470",
          course: "Televizyon ve Türler",
          ects: "4",
          time: [[16, 17, 18]]
        },
        {
          code: "MCSB 301",
          course: "Yayıncılık Stüdyosu I",
          ects: "12",
          time: [[6, 7, 8, 9, 48, 49, 50, 51]]
        },
        {
          code: "MCSB 497",
          course: "Bitirme Projesi I – Yayıncılık",
          ects: "8",
          time: [[16, 17, 18, 20, 21, 22]]
        },
        {
          code: "ME 201",
          course: "Mühendislik Termodinamiği",
          ects: "5",
          time: [[34, 35, 64, 65], [36, 37, 57, 58]]
        },
        {
          code: "ME 202",
          course: "Malzeme Bilimi",
          ects: "5",
          time: [[18, 19, 32, 33]]
        },
        {
          code: "ME 203",
          course: "Teknik Resim",
          ects: "5",
          time: [
            [17, 18, 19, 20, 21],
            [29, 30, 31, 32, 33],
            [59, 60, 61, 62, 63]
          ]
        },
        {
          code: "ME 205",
          course: "Statik",
          ects: "6",
          time: [[21, 22, 23]]
        },
        {
          code: "ME 206",
          course: "Dinamik",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "ME 208",
          course: "Malzemelerin Mekaniği",
          ects: "5",
          time: [[49, 50, 51]]
        },
        {
          code: "ME 305",
          course: "Akışkanlar Mekaniği",
          ects: "5",
          time: [[6, 7, 46, 47]]
        },
        {
          code: "ME 307",
          course: "Makine Elemanlari I",
          ects: "6",
          time: [[1, 2, 43, 44]]
        },
        {
          code: "ME 311",
          course: "Maliyet Analizi ve Mühendislik Yönetimi",
          ects: "4",
          time: [[3, 4, 5]]
        },
        {
          code: "ME 401",
          course: "Kontrol Teorisi",
          ects: "6",
          time: [[20, 21, 43, 44]]
        },
        {
          code: "ME 415",
          course: "Makine Mühendisliğinde Sayısal Yöntemler",
          ects: "5",
          time: [[1, 2, 31, 32]]
        },
        {
          code: "ME 420",
          course: "Sayısal Kontrollu Takım Tezgahları",
          ects: "5",
          time: [[50, 51, 61, 62]]
        },
        {
          code: "ME 431",
          course: "Momentum, Isı ve Kütle Transferi",
          ects: "5",
          time: [[17, 18, 43, 44]]
        },
        {
          code: "MEEY 101",
          course: "Emlak Yönetimi ve Uygulama",
          ects: "5",
          time: [[48, 49, 50, 51]]
        },
        {
          code: "MEEY 103",
          course: "Emlak Komisyonculuğu Teknikleri",
          ects: "4",
          time: [[1, 2, 34]]
        },
        {
          code: "MEEY 201",
          course: "Kamulaştırma Tekniği",
          ects: "5",
          time: [[19, 20, 21]]
        },
        {
          code: "MEEY 203",
          course: "Miras Hukuku",
          ects: "3",
          time: [[45, 46]]
        },
        {
          code: "MEEY 205",
          course: "İmar Mevzuatı",
          ects: "3",
          time: [[8, 9, 10]]
        },
        {
          code: "MEKO 101",
          course: "Mikro Ekonomi",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "MGT 131",
          course: "Tipografi I",
          ects: "8",
          time: [[49, 50, 51], [1, 2, 3], [52, 53, 54]]
        },
        {
          code: "MGT 151",
          course: "Temel Grafik Tasarımı",
          ects: "8",
          time: [
            [19, 20, 21, 43, 44, 45],
            [8, 9, 10, 11, 22, 23],
            [38, 39, 40, 41, 62, 63]
          ]
        },
        {
          code: "MGT 201",
          course: "Grafik Tasarım Proje I",
          ects: "5",
          time: [
            [43, 44, 45, 57, 58, 59],
            [15, 16, 17, 60, 61, 62],
            [4, 5, 47, 48]
          ]
        },
        {
          code: "MGT 203",
          course: "Stüdyo Fotoğrafcılığı",
          ects: "3",
          time: [[46, 47, 48], [49, 50, 51], [59, 60, 61]]
        },
        {
          code: "MGT 205",
          course: "Multimedya I",
          ects: "3",
          time: [[22, 23, 24], [19, 20, 21], [9, 10, 11]]
        },
        {
          code: "MGT 207",
          course: "Hareketli Grafik Tasarım",
          ects: "4",
          time: [[22, 23, 24, 25], [18, 19, 20, 21], [26, 27, 33, 34]]
        },
        {
          code: "MGT 209",
          course: "Animasyon Teknikleri",
          ects: "4",
          time: [
            [43, 44, 45, 57, 58, 59],
            [15, 16, 17, 60, 61, 62],
            [12, 13, 14, 49, 50, 51]
          ]
        },
        {
          code: "MGT 225",
          course: "Sosyal Medyada Grafik Uygulamaları",
          ects: "4",
          time: [[37, 38, 39], [21, 22, 23]]
        },
        {
          code: "MGT 227",
          course: "Grafikte Güncel Yaklaşımlar",
          ects: "3",
          time: [[29, 30, 31], [6, 7, 8]]
        },
        {
          code: "MGT 229",
          course: "Video Sanatı",
          ects: "4",
          time: [[32, 33, 52]]
        },
        {
          code: "MI 370",
          course: "Toplumsal Cinsiyet ve Medya",
          ects: "5",
          time: [[23, 31, 32]]
        },
        {
          code: "MICM 107",
          course: "Malzeme Bilgisi",
          ects: "5",
          time: [[23, 24, 33]]
        },
        {
          code: "MICM 109",
          course: "Temel Tasarım İlke ve Prensipleri",
          ects: "4",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "MICM 203",
          course: "Ergonomi",
          ects: "5",
          time: [[8, 9]]
        },
        {
          code: "MICM 205",
          course: "Bilgisayar Destekli Çizim II",
          ects: "4",
          time: [[15, 16, 17, 18]]
        },
        {
          code: "MICM 207",
          course: "İç Mekan Uygulamaları Atölyesi II",
          ects: "5",
          time: [[34, 35, 36, 37]]
        },
        {
          code: "MICM 231",
          course: "İç Mekan Tasarımı için Maket Yapımı",
          ects: "5",
          time: [[4, 5, 6, 7]]
        },
        {
          code: "MINT 101",
          course: "Statik",
          ects: "6",
          time: [[8, 9, 63]]
        },
        {
          code: "MINT 103",
          course: "Yapı Malzemeleri",
          ects: "5",
          time: [[33, 34, 35, 36]]
        },
        {
          code: "MINT 105",
          course: "Teknik Çizim",
          ects: "5",
          time: [[10, 11, 47, 48]]
        },
        {
          code: "MINT 201",
          course: "Yalıtım Teknolojisi",
          ects: "5",
          time: [[57, 58, 59, 60]]
        },
        {
          code: "MINT 203",
          course: "Prefabrik Yapılar",
          ects: "5",
          time: [[1, 2, 3, 4]]
        },
        {
          code: "MINT 205",
          course: "İnşaat Makineleri",
          ects: "5",
          time: [[32, 49, 50]]
        },
        {
          code: "MINT 207",
          course: "Proje Etüdü ve Uygulaması",
          ects: "4",
          time: [[37, 38, 39]]
        },
        {
          code: "MINT 209",
          course: "Su Temini ve İletimi",
          ects: "4",
          time: [[23, 24, 51, 52]]
        },
        {
          code: "MINT 250",
          course: "Betonarme",
          ects: "4",
          time: [[46, 47, 48]]
        },
        {
          code: "MISG 101",
          course: "İşçi Sağlığı ve İş Güvenliği",
          ects: "6",
          time: [[5, 6, 7]]
        },
        {
          code: "MISG 105",
          course: "Makine ve Teçhizat",
          ects: "5",
          time: [[8, 9]]
        },
        {
          code: "MISG 106",
          course: "İş Hukukuna Giriş",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "MISG 201",
          course: "İş yerlerinde Risk Analizleri ve Metotları",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "MISG 203",
          course: "İlk Yardım",
          ects: "4",
          time: [[36, 37]]
        },
        {
          code: "MISG 213",
          course: "Yapı İşlerinde İş Sağlığı ve Güvenliği",
          ects: "3",
          time: [[5, 6, 7, 8]]
        },
        {
          code: "MISG 215",
          course: "İş Hijyeni",
          ects: "4",
          time: [[50, 51]]
        },
        {
          code: "MISG 217",
          course: "Yangın",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "MISG 260",
          course: "Madenlerde İSG",
          ects: "4",
          time: [[18, 46, 47]]
        },
        {
          code: "MISL 101",
          course: "İşletme I",
          ects: "5",
          time: [[36, 37, 38]]
        },
        {
          code: "MLBT 101",
          course: "Genel Kimya I",
          ects: "5",
          time: [[4, 5, 46, 47]]
        },
        {
          code: "MLBT 105",
          course: "Genel Biyoloji",
          ects: "4",
          time: [[29, 30]]
        },
        {
          code: "MLBT 201",
          course: "Analitik Kimya II",
          ects: "4",
          time: [[8, 9, 49, 50]]
        },
        {
          code: "MLBT 203",
          course: "Bitki ve Toprak Analizi",
          ects: "4",
          time: [[37, 38, 63, 64]]
        },
        {
          code: "MLBT 205",
          course: "Gıda Analizleri",
          ects: "4",
          time: [[18, 19, 59, 60]]
        },
        {
          code: "MLBT 207",
          course: "Enstrümantel Analiz",
          ects: "4",
          time: [[57, 58]]
        },
        {
          code: "MLBT 209",
          course: "Organik Kimya",
          ects: "4",
          time: [[33, 34, 51, 52]]
        },
        {
          code: "MLBT 211",
          course: "İstatistik",
          ects: "4",
          time: [[22, 35, 36]]
        },
        {
          code: "MMAT 113",
          course: "Matematik I",
          ects: "5",
          time: [[7, 8, 9]]
        },
        {
          code: "MMC 101",
          course: "İletişim Çalışmalarına Giriş",
          ects: "6",
          time: [[29, 30, 31], [15, 16, 17]]
        },
        {
          code: "MMC 220",
          course: "İletişim Kuramları",
          ects: "6",
          time: [[21, 22, 23]]
        },
        {
          code: "MMC 304",
          course: "İletişim Sosyolojisi",
          ects: "6",
          time: [[47, 48, 49]]
        },
        {
          code: "MMD 301",
          course: "Tasarım Stüdyosu III",
          ects: "10",
          time: [[5, 6, 7, 8, 47, 48, 49, 50]]
        },
        {
          code: "MMD 303",
          course: "İleri Fotoğraf Teknikleri",
          ects: "4",
          time: [[62, 63, 64, 65]]
        },
        {
          code: "MMD 304",
          course: "Video Teknikleri ve Prodüksiyon",
          ects: "4",
          time: [[35, 36, 37, 38]]
        },
        {
          code: "MMD 401",
          course: "Tasarım Stüdyosu V",
          ects: "9",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "MMD 404",
          course: "Portfolyo Tasarımı ve Profesyonel Pratik",
          ects: "4",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "MMD 494",
          course: "Bitirme Tezi",
          ects: "4",
          time: [[1, 2, 3, 4]]
        },
        {
          code: "MMD 498",
          course: "Bitirme Projesi",
          ects: "10",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "MMIR 101",
          course: "Teknik Resim",
          ects: "3",
          time: [[50, 51, 52], [15, 16, 17]]
        },
        {
          code: "MMIR 103",
          course: "Sanat Tarihi",
          ects: "3",
          time: [[23, 24]]
        },
        {
          code: "MMIR 105",
          course: "Geleneksel Yapı Türleri ve Elemanları I",
          ects: "4",
          time: [[18, 19, 64]]
        },
        {
          code: "MMIR 107",
          course: "Bilgisayar Destekli Teknik Çizim",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "MMIR 201",
          course: "Eski Eserlerin Korunması ve Restorasyonu için İlkeler",
          ects: "4",
          time: [[22, 48, 49]]
        },
        {
          code: "MMIR 203",
          course: "Geleneksel Yapım Malzemeleri",
          ects: "5",
          time: [[20, 21, 46, 47]]
        },
        {
          code: "MMIR 205",
          course: "Malzeme Bozulmaları ve Onarım",
          ects: "4",
          time: [[8, 9, 10]]
        },
        {
          code: "MMIR 207",
          course: "Geleneksel Yapılarda Bezeme",
          ects: "4",
          time: [[17, 18, 19]]
        },
        {
          code: "MMIR 209",
          course: "Koruma Projesi",
          ects: "5",
          time: [[57, 58, 59, 60]]
        },
        {
          code: "MMIR 211",
          course: "Restorasyon Kimyası",
          ects: "4",
          time: [[43, 44, 45]]
        },
        {
          code: "MMIR 231",
          course: "Mimarlığın Yakın Tarihi",
          ects: "3",
          time: [[36, 37, 38]]
        },
        {
          code: "MMVD 105",
          course: "Mobilya İmalatında Temel İşlemler",
          ects: "5",
          time: [[19, 20, 62, 63]]
        },
        {
          code: "MMVD 107",
          course: "Masif Mobilya",
          ects: "5",
          time: [[48, 49, 50, 51]]
        },
        {
          code: "MMVD 201",
          course: "Mekan Donatı II",
          ects: "4",
          time: [[46, 47, 61]]
        },
        {
          code: "MMVD 207",
          course: "Ahşap Süsleme Teknikleri I",
          ects: "5",
          time: [[21, 22, 57, 58]]
        },
        {
          code: "MMVD 209",
          course: "Üst Yüzey işlemleri",
          ects: "4",
          time: [[23, 24, 59, 60]]
        },
        {
          code: "MMVD 250",
          course: "Mobilya Tasarımında Güncel Yaklaşımlar",
          ects: "4",
          time: [[34, 35, 36, 37]]
        },
        {
          code: "MPAZ 101",
          course: "Pazarlama İlkeleri",
          ects: "4",
          time: [[15, 16, 63]]
        },
        {
          code: "MPAZ 103",
          course: "Satış Organizasyonu ve Yönetimi",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "MPAZ 110",
          course: "Sunum Teknikleri",
          ects: "3",
          time: [[29, 30, 31]]
        },
        {
          code: "MPAZ 114",
          course: "Sosyal Psikoloji",
          ects: "5",
          time: [[29, 30, 31]]
        },
        {
          code: "MPAZ 201",
          course: "Marka Yönetimi",
          ects: "5",
          time: [[4, 59, 60, 61]]
        },
        {
          code: "MPAZ 203",
          course: "Hizmet Pazarlaması",
          ects: "4",
          time: [[7, 8, 18]]
        },
        {
          code: "MPAZ 250",
          course: "Reklamcılığa Giriş",
          ects: "4",
          time: [[22, 23, 24]]
        },
        {
          code: "MTOI 101",
          course: "Genel Turizm",
          ects: "6",
          time: [[4, 5, 6]]
        },
        {
          code: "MTOI 103",
          course: "Otel İşletmeciliği",
          ects: "5",
          time: [[35, 36, 37]]
        },
        {
          code: "MTOI 105",
          course: "Seyahat Acentacılığı",
          ects: "4",
          time: [[7, 8]]
        },
        {
          code: "MTOI 203",
          course: "Turizm Pazarlaması",
          ects: "4",
          time: [[9, 10, 11]]
        },
        {
          code: "MTOI 205",
          course: "Yiyecek İçecek İşletmeciliği",
          ects: "5",
          time: [[23, 24, 25]]
        },
        {
          code: "MTOI 207",
          course: "Toplam Kalite Yönetimi",
          ects: "4",
          time: [[62, 63, 64]]
        },
        {
          code: "MTOI 225",
          course: "Girişimcilik",
          ects: "5",
          time: [[23, 24, 25]]
        },
        {
          code: "MTOI 230",
          course: "Tüketici Davranışları",
          ects: "5",
          time: [[64, 65, 66]]
        },
        {
          code: "MTOI 240",
          course: "Yiyecek İçecek Servisi",
          ects: "4",
          time: [[50, 51, 52]]
        },
        {
          code: "MUH 100",
          course: "Genel Muhasebe I",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "MUH 103",
          course: "Muhasebe",
          ects: "6",
          time: [[18, 19, 20]]
        },
        {
          code: "MUH 205",
          course: "Maliyet Muhasebesi",
          ects: "6",
          time: [[16, 17, 18]]
        },
        {
          code: "MUH 207",
          course: "Bilgisayarlı Muhasebe I",
          ects: "6",
          time: [[61, 62, 63]]
        },
        {
          code: "MUH 220",
          course: "Envanter İşlemleri",
          ects: "5",
          time: [[15, 47, 48]]
        },
        {
          code: "MUH 221",
          course: "Şirketler Muhasebesi",
          ects: "5",
          time: [[49, 50, 51]]
        },
        {
          code: "MYO 201",
          course: "Büro Yönetimi I",
          ects: "5",
          time: [[5, 6, 47, 48, 49, 50]]
        },
        {
          code: "OPT 101",
          course: "Fizik ve Geometrik Optik I",
          ects: "5",
          time: [[48, 49, 50]]
        },
        {
          code: "OPT 103",
          course: "Optisyenliğe Giriş",
          ects: "5",
          time: [[19, 20]]
        },
        {
          code: "OPT 105",
          course: "Göz Anatomisi ve Fizyolojisi",
          ects: "5",
          time: [[15, 16, 17]]
        },
        {
          code: "OPT 107",
          course: "Optisyenlik Kimyası",
          ects: "3",
          time: [[4, 5]]
        },
        {
          code: "OPT 201",
          course: "Görme Optiği II",
          ects: "5",
          time: [[21, 22, 23]]
        },
        {
          code: "OPT 203",
          course: "Optisyenlik II",
          ects: "8",
          time: [[6, 7, 8, 9, 58, 59, 60, 61, 62, 63]]
        },
        {
          code: "OPT 205",
          course: "Pazarlama İlkeleri ve Satış",
          ects: "4",
          time: [[33, 34]]
        },
        {
          code: "PD 316",
          course: "Sürdürülebilirlik İçin Tasarım",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "PD 409",
          course: "Endüstriyel Tasarım Stüdyosu II",
          ects: "9",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "PHYS 100",
          course: "Genel Fizik I-Mekanik ve Termodinamik",
          ects: "6",
          time: [
            [29, 30, 64, 65],
            [29, 30, 50, 51],
            [1, 2, 60, 61],
            [50, 51, 59, 60],
            [3, 4, 43, 44]
          ]
        },
        {
          code: "PHYS 105",
          course: "Fizik I",
          ects: "6",
          time: [[15, 16, 17, 64, 65]]
        },
        {
          code: "PHYS 201",
          course: "Dalgalar, Akışkanlar ve Termodinamik",
          ects: "6",
          time: [[1, 2, 62, 63]]
        },
        {
          code: "PRA 206",
          course: "Halkla İlişkilerin İlkeleri",
          ects: "5",
          time: [[63, 64, 65]]
        },
        {
          code: "PRA 221",
          course: "Pazarlama İletişimi Araştırmaları",
          ects: "5",
          time: [[34, 35, 36]]
        },
        {
          code: "PRA 230",
          course: "Pazarlama İletişimi",
          ects: "5",
          time: [[18, 19, 20]]
        },
        {
          code: "PRA 300",
          course: "HİR'de Temel Grafik Uygulamaları I",
          ects: "5",
          time: [[1, 2, 3], [5, 6, 7]]
        },
        {
          code: "PRA 301",
          course: "Medya Planlama ve Satın Alma",
          ects: "5",
          time: [[29, 30, 31]]
        },
        {
          code: "PRA 307",
          course: "İletişimde Yaratıcılık",
          ects: "5",
          time: [[60, 61, 62]]
        },
        {
          code: "PRA 311",
          course: "Stratejik Halkla İlişkiler",
          ects: "5",
          time: [[63, 64, 65]]
        },
        {
          code: "PRA 342",
          course: "Halkla İlişkilerde Yazım",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "PRA 350",
          course: "Reklamcılık Yönetimi",
          ects: "5",
          time: [[20, 21, 22]]
        },
        {
          code: "PRA 360",
          course: "Kültürlerarası İletişim",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "PRA 400",
          course: "Stratejik Reklam Analizi",
          ects: "4",
          time: [[57, 58, 59]]
        },
        {
          code: "PRA 416",
          course: "Kurumsal İletişim",
          ects: "5",
          time: [[47, 48, 49]]
        },
        {
          code: "PRA 435",
          course: "İletişim Kampanyası Tasarımı",
          ects: "10",
          time: [[5, 6, 7, 8, 44, 45, 46]]
        },
        {
          code: "PRA 485",
          course: "İletişim Ajansı I",
          ects: "9",
          time: [[20, 21, 22, 23, 34, 35, 36, 37]]
        },
        {
          code: "PSIR 201",
          course: "Avrupa Birliği'nin Tarihi ve Kurumları",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "PSIR 203",
          course: "Diplomasi Tarihi I",
          ects: "5",
          time: [[15, 16, 17], [31, 32, 33]]
        },
        {
          code: "PSIR 205",
          course: "Siyasi Düşünceler Tarihi",
          ects: "6",
          time: [[35, 36, 37]]
        },
        {
          code: "PSIR 207",
          course: "Siyaset Bilimine Giriş",
          ects: "6",
          time: [[43, 44, 45], [61, 62, 63]]
        },
        {
          code: "PSIR 301",
          course: "Türk Siyasetinde Güncel Konular",
          ects: "6",
          time: [[15, 16, 17], [29, 30, 31]]
        },
        {
          code: "PSIR 303",
          course: "Araştırma Yöntemleri",
          ects: "4",
          time: [[4, 5, 6]]
        },
        {
          code: "PSIR 305",
          course: "Dış Politika Analizi",
          ects: "6",
          time: [[19, 20, 21]]
        },
        {
          code: "PSIR 307",
          course: "Uluslararası Politik Ekonomi",
          ects: "6",
          time: [[57, 58, 59], [47, 48, 49]]
        },
        {
          code: "PSIR 320",
          course: "Ortadoğu Politikaları",
          ects: "6",
          time: [[21, 22, 23]]
        },
        {
          code: "PSIR 330",
          course: "Osmanlı Siyasi Tarihi",
          ects: "6",
          time: [[43, 44, 45]]
        },
        {
          code: "PSIR 350",
          course: "Avrupa Birliği'nin Komşuluk Politikası",
          ects: "6",
          time: [[35, 36, 37]]
        },
        {
          code: "PSIR 370",
          course: "Diplomatik Yazışma Teknikleri",
          ects: "6",
          time: [[63, 64, 65]]
        },
        {
          code: "PSIR 436",
          course: "Milliyetçilik ve Kimlik Politikaları",
          ects: "6",
          time: [[49, 50, 51]]
        },
        {
          code: "PSIR 450",
          course: "Uluslararası Güvenlik",
          ects: "6",
          time: [[7, 8, 9]]
        },
        {
          code: "PSY 100",
          course: "Psikolojide Okuma ve Yazma",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "PSY 101",
          course: "Psikolojiye Giriş I",
          ects: "6",
          time: [[15, 16, 36], [1, 2, 35]]
        },
        {
          code: "PSY 103",
          course: "Psikolojide Niceliksel Yöntemler I",
          ects: "6",
          time: [[61, 62, 63], [46, 47, 48]]
        },
        {
          code: "PSY 201",
          course: "Gelişim Psikolojisine Giriş I",
          ects: "5",
          time: [[29, 30, 31], [7, 8, 9]]
        },
        {
          code: "PSY 203",
          course: "Sosyal Psikoloji I",
          ects: "4",
          time: [[18, 19, 20], [4, 5, 6]]
        },
        {
          code: "PSY 205",
          course: "Psikolojide Araştırma Yöntemleri I",
          ects: "5",
          time: [[49, 50, 51], [57, 58, 59]]
        },
        {
          code: "PSY 303",
          course: "Algı Psikolojisi",
          ects: "6",
          time: [[15, 16, 17], [32, 33, 34]]
        },
        {
          code: "PSY 304",
          course: "Psikopatoloji",
          ects: "6",
          time: [[1, 2, 3], [5, 6, 7]]
        },
        {
          code: "PSY 305",
          course: "Endüstriyel Psikoloji",
          ects: "7",
          time: [[29, 30, 31], [60, 61, 62]]
        },
        {
          code: "PSY 307",
          course: "Kişilik Kuramları",
          ects: "7",
          time: [[46, 47, 48]]
        },
        {
          code: "PSY 312",
          course: "Psikolojik Danışmanlık Uygulamaları",
          ects: "6",
          time: [[18, 19, 20]]
        },
        {
          code: "PSY 316",
          course: "İleri Fizyolojik Psikoloji",
          ects: "6",
          time: [[57, 58, 59]]
        },
        {
          code: "PSY 420",
          course: "Nöropsikolojik Değerlendirme",
          ects: "6",
          time: [[29, 30, 31]]
        },
        {
          code: "PSY 424",
          course: "Bireysel Farklılıklar",
          ects: "6",
          time: [[61, 62, 63]]
        },
        {
          code: "RTV 101",
          course: "İletişime Giriş",
          ects: "4",
          time: [[18, 19]]
        },
        {
          code: "RTV 103",
          course: "Video ve Ses Teknikleri",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "RTV 105",
          course: "Temel Fotoğrafcılık",
          ects: "5",
          time: [[1, 2, 3], [49, 50, 51], [57, 58, 59], [5, 6, 7]]
        },
        {
          code: "RTV 107",
          course: "Senaryo Yazımı",
          ects: "5",
          time: [[43, 44]]
        },
        {
          code: "RTV 109",
          course: "Medya Hukuku",
          ects: "5",
          time: [[65, 66]]
        },
        {
          code: "RTV 140",
          course: "Temel İletişim Bilgileri",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "RTV 201",
          course: "Haber Toplama ve Yazma",
          ects: "4",
          time: [[8, 9, 10]]
        },
        {
          code: "RTV 203",
          course: "Radyo Program Yapımcılığı",
          ects: "4",
          time: [[34, 35]]
        },
        {
          code: "RTV 209",
          course: "İletişim Sosyolojisi",
          ects: "4",
          time: [[22, 23, 24]]
        },
        {
          code: "RTV 211",
          course: "Video Uygulamaları",
          ects: "6",
          time: [[20, 21, 36, 37]]
        },
        {
          code: "RTV 215",
          course: "Güzel Konuşma Sanatı",
          ects: "4",
          time: [[47, 48]]
        },
        {
          code: "RTV 217",
          course: "Ses Tasarımı",
          ects: "3",
          time: [[15, 16, 17]]
        },
        {
          code: "RTV 223",
          course: "Film Eleştirisi",
          ects: "5",
          time: [[5, 6, 7]]
        },
        {
          code: "RTV 225",
          course: "Sinema ve Toplum",
          ects: "5",
          time: [[29, 30, 31]]
        },
        {
          code: "RTV 230",
          course: "İnternet Yayıncılığı",
          ects: "4",
          time: [[31, 32, 63, 64]]
        },
        {
          code: "RTV 240",
          course: "Kurumsal İletişim",
          ects: "4",
          time: [[43, 44]]
        },
        {
          code: "RTV 260",
          course: "Sosyal Sorumluluk",
          ects: "4",
          time: [[43, 44]]
        },
        {
          code: "RUS 101",
          course: "Rusça I",
          ects: "4",
          time: [
            [22, 23, 50, 51],
            [5, 6, 29, 30],
            [7, 8, 59, 60],
            [9, 10, 33, 34]
          ]
        },
        {
          code: "RUS 102",
          course: "Rusça II",
          ects: "4",
          time: [[1, 2, 43, 44]]
        },
        {
          code: "RUS 201",
          course: "Rusça III",
          ects: "4",
          time: [[32, 33, 61, 62], [36, 37, 64, 65], [20, 21, 59, 60]]
        },
        {
          code: "RUS 202",
          course: "Rusça IV",
          ects: "4",
          time: [[4, 5, 31, 32]]
        },
        {
          code: "RUS 301",
          course: "Rusça V",
          ects: "4",
          time: [[20, 21, 48, 49]]
        },
        {
          code: "RUS 310",
          course: "Turizm Endüstrisi için Rusça",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "RUS 401",
          course: "Rusça VII",
          ects: "4",
          time: [[31, 32, 45, 46]]
        },
        {
          code: "SBM 101",
          course: "Tıbbın Bilimsel Temelleri I",
          ects: "16",
          time: [[1, 2, 3, 43, 44, 45]]
        },
        {
          code: "SBM 201",
          course: "Tıbbın Bilimsel Temelleri III",
          ects: "18",
          time: [[1, 2, 3, 43, 44, 45]]
        },
        {
          code: "SBM 301",
          course: "Tıbbın Bilimsel Temelleri V",
          ects: "18",
          time: [[1, 2, 3, 57, 58, 59]]
        },
        {
          code: "SE 105",
          course: "Yazılım Mühendisliğine Giriş",
          ects: "3",
          time: [[31, 32, 33]]
        },
        {
          code: "SE 113",
          course: "Programlamaya Giriş",
          ects: "6",
          time: [
            [8, 9, 22, 23],
            [15, 16, 47, 48],
            [34, 35, 45, 46],
            [8, 9, 36, 37],
            [5, 6, 57, 58],
            [6, 7, 64, 65]
          ]
        },
        {
          code: "SE 115",
          course: "Programlamaya Giriş I",
          ects: "6",
          time: [[5, 6, 15, 16], [3, 4, 21, 22], [5, 6, 64, 65], [3, 4, 29, 30]]
        },
        {
          code: "SE 302",
          course: "Yazılım Mühendisliğinin İlkeleri",
          ects: "5",
          time: [[1, 2, 3]]
        },
        {
          code: "SE 305",
          course: "Yazılım Belirtim ve Tasarımı",
          ects: "8",
          time: [[1, 2, 35, 36], [3, 4, 33, 34]]
        },
        {
          code: "SE 309",
          course: "Programlama Dilleri Kavramları",
          ects: "8",
          time: [
            [30, 31, 49, 50],
            [1, 2, 17, 18],
            [30, 31, 59, 60],
            [1, 2, 36, 37]
          ]
        },
        {
          code: "SE 320",
          course: "Oyun Geliştirmeye Giriş",
          ects: "5",
          time: [[63, 64, 65]]
        },
        {
          code: "SE 350",
          course: "Oyun Tasarımı",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "SE 352",
          course: "Bilgisayar Oyunlarında Ağ Programlama",
          ects: "5",
          time: [[5, 6, 7]]
        },
        {
          code: "SE 360",
          course: "Yazılım Geliştirmede İlerlemeler",
          ects: "5",
          time: [[61, 62, 63]]
        },
        {
          code: "SE 366",
          course: "Numerik Analiz",
          ects: "8",
          time: [[8, 9, 10]]
        },
        {
          code: "SE 420",
          course: "Yapay Zeka ve Uzman Sistemler",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "SE 431",
          course: "Bilgisayar Oyunlarında 3B Modelleme",
          ects: "5",
          time: [[57, 58, 59]]
        },
        {
          code: "SE 460",
          course: "Yazılım Ölçümü",
          ects: "5",
          time: [[46, 47, 48]]
        },
        {
          code: "SE 480",
          course: "İstemci-Taraflı Skript Dilleri",
          ects: "5",
          time: [[15, 16, 17]]
        },
        {
          code: "SHKH 111",
          course: "Havacılık Esasları ve Terminolojisi",
          ects: "5",
          time: [[15, 16, 57, 58]]
        },
        {
          code: "SHKH 115",
          course: "Havacılık ve Uçuş Bilgisi Temelleri",
          ects: "5",
          time: [[18, 19, 20]]
        },
        {
          code: "SHKH 117",
          course: "Dünya Kültürleri ve Destinasyonları",
          ects: "3",
          time: [[46, 47]]
        },
        {
          code: "SHKH 131",
          course: "Sivil Havacılığa Giriş",
          ects: "6",
          time: [[4, 5, 6]]
        },
        {
          code: "SHKH 201",
          course: "Tıbbi Konular ve İlkyardım Eğitimi",
          ects: "3",
          time: [[37, 38, 64, 65]]
        },
        {
          code: "SHKH 203",
          course: "Tehlikeli Madde Eğitimi",
          ects: "3",
          time: [[57, 58]]
        },
        {
          code: "SHKH 205",
          course: "Acil Durum Emniyet Kuralları I",
          ects: "5",
          time: [[8, 9, 10, 51]]
        },
        {
          code: "SHKH 209",
          course: "Ekip Kaynak Yönetimi",
          ects: "4",
          time: [[23, 24, 25]]
        },
        {
          code: "SOC 101",
          course: "Sosyolojiye Giriş I",
          ects: "6",
          time: [[35, 36, 37]]
        },
        {
          code: "SOC 104",
          course: "Kültürel Antropoloji",
          ects: "5",
          time: [[21, 22, 23]]
        },
        {
          code: "SOC 201",
          course: "Klasik Sosyoloji Kuramları",
          ects: "5",
          time: [[3, 4, 32]]
        },
        {
          code: "SOC 206",
          course: "Suçbilim",
          ects: "6",
          time: [[57, 58, 59]]
        },
        {
          code: "SOC 208",
          course: "Siyaset Sosyolojisi",
          ects: "6",
          time: [[45, 46, 60]]
        },
        {
          code: "SOC 211",
          course: "Sosyal Bilimler için Niceliksel Yöntemler",
          ects: "6",
          time: [[18, 19, 50, 51]]
        },
        {
          code: "SOC 303",
          course: "Toplumsal Değişim",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "SOC 311",
          course: "Türkiye'nin Toplumsal Yapısı",
          ects: "8",
          time: [[49, 50, 51]]
        },
        {
          code: "SOC 315",
          course: "Devrimler Tarihi",
          ects: "6",
          time: [[21, 22, 23]]
        },
        {
          code: "SOC 380",
          course: "Çevre Sosyolojisi",
          ects: "6",
          time: [[1, 2, 3]]
        },
        {
          code: "SOC 410",
          course: "Tarihte Mitler, İnançlar ve Düşünceler",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "SOC 435",
          course: "Gündelik Yaşam Sosyolojisi",
          ects: "6",
          time: [[1, 2, 3]]
        },
        {
          code: "SOC 480",
          course: "Modernite, Mekan ve Kültür",
          ects: "6",
          time: [[19, 20, 21]]
        },
        {
          code: "SOC 497",
          course: "Sosyoloji Projesi I",
          ects: "7",
          time: [[48, 62, 63]]
        },
        {
          code: "SPN 101",
          course: "İspanyolca I",
          ects: "4",
          time: [
            [15, 16, 62, 63],
            [3, 4, 57, 58],
            [31, 32, 45, 46],
            [3, 4, 64, 65],
            [20, 21, 29, 30],
            [8, 9, 59, 60],
            [20, 21, 33, 34],
            [3, 4, 22, 23],
            [5, 6, 62, 63],
            [3, 4, 43, 44],
            [5, 6, 32, 33],
            [32, 33, 45, 46],
            [31, 32, 43, 44],
            [8, 9, 36, 37],
            [22, 23, 32, 33],
            [47, 48, 64, 65],
            [20, 21, 34, 35],
            [20, 21, 59, 60],
            [17, 18, 50, 51],
            [36, 37, 57, 58],
            [29, 30, 59, 60],
            [18, 19, 60, 61],
            [20, 21, 62, 63],
            [23, 24, 33, 34]
          ]
        },
        {
          code: "SPN 102",
          course: "İspanyolca II",
          ects: "4",
          time: [[15, 16, 47, 48], [8, 9, 50, 51]]
        },
        {
          code: "SPN 201",
          course: "İspanyolca III",
          ects: "4",
          time: [
            [45, 46, 64, 65],
            [8, 9, 64, 65],
            [36, 37, 59, 60],
            [20, 21, 64, 65],
            [5, 6, 15, 16],
            [8, 9, 50, 51],
            [29, 30, 64, 65],
            [22, 23, 33, 34],
            [1, 2, 50, 51],
            [15, 16, 61, 62],
            [43, 44, 57, 58],
            [3, 4, 29, 30],
            [15, 16, 64, 65],
            [36, 37, 43, 44],
            [6, 7, 36, 37],
            [18, 19, 45, 46],
            [31, 32, 61, 62]
          ]
        },
        {
          code: "SPN 202",
          course: "İspanyolca IV",
          ects: "4",
          time: [[43, 44, 60, 61]]
        },
        {
          code: "SPN 301",
          course: "İspanyolca V",
          ects: "4",
          time: [[20, 21, 48, 49], [22, 23, 47, 48], [17, 18, 59, 60]]
        },
        {
          code: "SPN 310",
          course: "İspanyolca Sözlü Anlatım Becerileri",
          ects: "4",
          time: [[32, 33, 34]]
        },
        {
          code: "SPN 320",
          course: "İspanyol ve Latin Müziği, Dansı ve Karnaval Kültürü",
          ects: "4",
          time: [[20, 21, 22], [31, 32, 33]]
        },
        {
          code: "SPN 330",
          course: "İspanya ve Latin Amerika Kültürü",
          ects: "4",
          time: [[4, 5, 6]]
        },
        {
          code: "SPN 401",
          course: "İspanyolca VII",
          ects: "4",
          time: [[8, 9, 48, 49]]
        },
        {
          code: "TDS 101",
          course: "Tıbbi Dökümantasyon I",
          ects: "6",
          time: [[4, 5, 6, 7]]
        },
        {
          code: "TDS 103",
          course: "Hastane Yönetimi ve Organizasyon",
          ects: "6",
          time: [[15, 16, 17]]
        },
        {
          code: "TDS 205",
          course: "Mesleki Yazışma Teknikleri I",
          ects: "3",
          time: [[33, 34]]
        },
        {
          code: "TDS 207",
          course: "Tıbbi Dokümantasyon III",
          ects: "5",
          time: [[29, 30, 43, 44, 45, 46]]
        },
        {
          code: "TDS 214",
          course: "Yazılı Anlatım",
          ects: "3",
          time: [[35, 36]]
        },
        {
          code: "TDS 215",
          course: "Klinik Eğitim Uygulaması",
          ects: "4",
          time: [[57, 58, 59, 60, 61, 62]]
        },
        {
          code: "TGT 101",
          course: "Tıbbi Görüntüleme I",
          ects: "7",
          time: [
            [18, 19, 20, 57, 58, 59, 60, 61, 62],
            [18, 19, 20, 43, 44, 45, 46, 47, 48]
          ]
        },
        {
          code: "TGT 103",
          course: "Tıbbi Fizik",
          ects: "4",
          time: [[29, 30, 31]]
        },
        {
          code: "TGT 105",
          course: "Tıbbi ve Radyolojik Terminoloji",
          ects: "3",
          time: [[35, 36]]
        },
        {
          code: "TGT 201",
          course: "Tıbbi Görüntüleme III",
          ects: "8",
          time: [
            [4, 5, 43, 44, 45, 46, 47, 48, 49, 50],
            [4, 5, 57, 58, 59, 60, 61, 62, 63, 64]
          ]
        },
        {
          code: "TGT 203",
          course: "Nükleer Tıp",
          ects: "5",
          time: [[5, 6, 7]]
        },
        {
          code: "TGT 209",
          course: "İleri BT ve MR Teknikleri",
          ects: "3",
          time: [[1, 2]]
        },
        {
          code: "TLT 101",
          course: "Tıbbi Mikrobiyoloji I",
          ects: "5",
          time: [[19, 20, 29, 30]]
        },
        {
          code: "TLT 103",
          course: "Biyokimya",
          ects: "3",
          time: [[1, 2]]
        },
        {
          code: "TLT 105",
          course: "Laboratuar Kimyası",
          ects: "4",
          time: [[6, 7, 17]]
        },
        {
          code: "TLT 107",
          course: "Laboratuar Aletleri",
          ects: "6",
          time: [[3, 31, 32]]
        },
        {
          code: "TLT 201",
          course: "Temel Laboratuar Uygulamaları I",
          ects: "10",
          time: [[35, 36, 57, 58, 59, 60, 61]]
        },
        {
          code: "TLT 203",
          course: "Tıbbi Biyoloji ve Genetik",
          ects: "3",
          time: [[19, 20]]
        },
        {
          code: "TLT 205",
          course: "Tıbbi Laboratuarda Organizasyon",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "TLT 207",
          course: "İmmunolojik Yöntemler",
          ects: "3",
          time: [[21, 22]]
        },
        {
          code: "TLT 212",
          course: "Histolojik Teknikler",
          ects: "4",
          time: [[5, 6, 7, 8]]
        },
        {
          code: "TR 101",
          course: "Türkçe I",
          ects: "4",
          time: [[23, 24, 62, 63]]
        },
        {
          code: "TRH 100",
          course: "Atatürk İlkeleri ve İnkılap Tarihi",
          ects: "4",
          time: [[3, 4, 87, 88], [23, 24, 93, 94], [38, 39, 80, 81]]
        },
        {
          code: "TRH 101",
          course: "Atatürk İlkeleri ve İnkılap Tarihi I",
          ects: "1",
          time: [
            [23, 76],
            [24, 77],
            [36, 78],
            [37, 79],
            [38, 80],
            [9, 76],
            [10, 77],
            [23, 93],
            [24, 94],
            [36, 78],
            [52, 82],
            [35, 77],
            [65, 93],
            [66, 94]
          ]
        },
        {
          code: "TRK 100",
          course: "Türk Dili",
          ects: "4",
          time: [[23, 24, 79, 80], [32, 33, 74, 75], [46, 47, 88, 89]]
        },
        {
          code: "TRK 101",
          course: "Türk Dili I",
          ects: "1",
          time: [
            [8, 78],
            [25, 81],
            [59, 73],
            [35, 91],
            [49, 77],
            [32, 82],
            [49, 81]
          ]
        },
        {
          code: "TS 101",
          course: "Anatomi",
          ects: "4",
          time: [[15, 16], [4, 5], [7, 8], [2, 3]]
        },
        {
          code: "TS 103",
          course: "Fizyoloji",
          ects: "4",
          time: [[32, 33], [19, 20], [59, 60]]
        },
        {
          code: "TS 104",
          course: "Sağlık Hizmetlerinde İletişim",
          ects: "4",
          time: [[29, 30, 31], [19, 20, 21], [47, 48, 49]]
        },
        {
          code: "TS 105",
          course: "Tıbbi Terminoloji",
          ects: "5",
          time: [[5, 6]]
        },
        {
          code: "TS 109",
          course: "Temel Fizik",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "TS 120",
          course: "İlk Yardım",
          ects: "3",
          time: [[33, 34]]
        },
        {
          code: "TS 205",
          course: "Meslek Etiği",
          ects: "3",
          time: [[43, 44], [33, 34], [22, 23]]
        },
        {
          code: "TS 206",
          course: "Sağlıkta Araştırma Teknikleri",
          ects: "3",
          time: [[21, 22]]
        },
        {
          code: "TS 210",
          course: "Sağlık Hizmetlerinde Kalite ve Akreditasyon",
          ects: "3",
          time: [[19, 20]]
        },
        {
          code: "TS 211",
          course: "Girişimcilik",
          ects: "3",
          time: [[15, 16, 17]]
        },
        {
          code: "TS 217",
          course: "Enfeksiyon Hastalıkları ve Korunma",
          ects: "3",
          time: [[1, 2]]
        },
        {
          code: "TS 219",
          course: "Sağlık Yönetimi",
          ects: "5",
          time: [[15, 16, 17]]
        },
        {
          code: "TS 220",
          course: "Hastalık Bilgisi",
          ects: "3",
          time: [[29, 30]]
        },
        {
          code: "TS 221",
          course: "Eleştirel Düşünme",
          ects: "3",
          time: [[35, 36]]
        },
        {
          code: "TURK 100",
          course: "Türk Dili",
          ects: "4",
          time: [
            [6, 7, 76, 77],
            [23, 24, 79, 80],
            [61, 62, 89, 90],
            [32, 33, 74, 75],
            [46, 47, 88, 89],
            [35, 36, 91, 92],
            [46, 47, 74, 75]
          ]
        },
        {
          code: "VCD 101",
          course: "Sayısal Ortamda Tasarıma Giriş",
          ects: "4",
          time: [[35, 36, 37, 38]]
        },
        {
          code: "VCD 111",
          course: "Çizim Stüdyosu I",
          ects: "4",
          time: [[43, 44, 45, 46], [20, 21, 22, 23]]
        },
        {
          code: "VCD 201",
          course: "Tasarımı Stüdyosu I",
          ects: "9",
          time: [[15, 16, 17, 18, 57, 58, 59, 60]]
        },
        {
          code: "VCD 203",
          course: "Tipografik Tasarım I",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "VCD 205",
          course: "Bilgisayar Destekli Grafik Tasarımı",
          ects: "4",
          time: [[1, 2, 3]]
        },
        {
          code: "VCD 207",
          course: "Temel Fotoğrafçılık",
          ects: "6",
          time: [[29, 30, 31, 32]]
        },
        {
          code: "VCD 211",
          course: "Çizim Stüdyosu II",
          ects: "3",
          time: [[33, 34, 35]]
        },
        {
          code: "VCD 310",
          course: "Ses Tasarımı",
          ects: "4",
          time: [[62, 63, 64, 65]]
        },
        {
          code: "VCD 320",
          course: "Dijital Medyayı Anlamak",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "VCD 331",
          course: "Etkileşim Tasarımının Temelleri",
          ects: "4",
          time: [[32, 33, 34]]
        },
        {
          code: "VCD 421",
          course: "Dijital İllüstrasyon",
          ects: "4",
          time: [[48, 49, 50, 51]]
        },
        {
          code: "VCD 426",
          course: "Etkileşimli Medya Tasarımı",
          ects: "4",
          time: [[43, 44, 45, 46]]
        },
        {
          code: "VCD 428",
          course: "Hareketli Grafik Tasarımı",
          ects: "4",
          time: [[20, 21, 22, 23]]
        },
        {
          code: "VCD 451",
          course: "Görsel İletişim Tasarımında Uygulamalı Atölye Çalışması",
          ects: "1",
          time: [[33, 34]]
        },
        {
          code: "YB 101",
          course: "Yaşlı Bakım İlke ve Uygulamaları I",
          ects: "7",
          time: [[21, 22, 29, 30]]
        },
        {
          code: "YB 106",
          course: "Yaşlılarda Fiziksel Aktivite",
          ects: "3",
          time: [[36, 37]]
        },
        {
          code: "YB 109",
          course: "Temel Gerontoloji",
          ects: "5",
          time: [[34, 35]]
        },
        {
          code: "YB 201",
          course: "Yaşlı Bakım İlke ve Uygulamaları III",
          ects: "8",
          time: [[5, 6, 43, 44, 45, 46, 47, 48, 49, 50]]
        },
        {
          code: "YB 203",
          course: "Yaşlıda Kronik Hastalıklar",
          ects: "4",
          time: [[15, 16, 17]]
        },
        {
          code: "YB 207",
          course: "Mesleki Uygulama I",
          ects: "6",
          time: [[57, 58, 59, 60, 61, 62, 63, 64]]
        },
        {
          code: "YB 230",
          course: "Uğraş Terapisi",
          ects: "4",
          time: [[7, 8, 9]]
        }
      ],
      selectedCourses: [],
      courseNames: [],
      combinationsArray: [],
      show: false
    };
  },
  methods: {
    findSchedules: function() {
      let arrayOfPossibilities = [];
      this.combinationsArray = [];
      this.courseNames = [];
      for (let i = 0; i < this.selectedCourses.length; i++) {
        let dummy = [];
        for (let j = 0; j < this.selectedCourses[i].time.length; j++) {
          dummy.push(j);
        }
        arrayOfPossibilities.push(dummy);
      }

      function getCombinations(allOptionsArray, combination) {
        if (allOptionsArray.length > 0) {
          for (var i = 0; i < allOptionsArray[0].length; i++) {
            var tmp = allOptionsArray.slice(0);
            combination.codes[combination.counter] = allOptionsArray[0][i];
            tmp.shift();
            combination.counter++;
            getCombinations(tmp, combination);
          }
        } else {
          var combi = combination.codes.slice(0);
          combination.result.push(combi);
        }
        combination.counter--;
      }

      var combination = { codes: [], result: [], counter: 0 };

      getCombinations(arrayOfPossibilities, combination);

      let tempArray;
      let finalArray = [];
      let tempCourseNamesArray;
      for (let i = 0; i < combination.result.length; i++) {
        tempArray = [];
        tempCourseNamesArray = [];
        for (let j = 0; j < this.selectedCourses.length; j++) {
          tempArray.push(
            this.selectedCourses[j].time[combination.result[i][j]]
          );
          for (
            let k = 0;
            k < this.selectedCourses[j].time[combination.result[i][j]].length;
            k++
          ) {
            tempCourseNamesArray[
              this.selectedCourses[j].time[combination.result[i][j]][k]
            ] = this.selectedCourses[j].code;
          }
        }
        finalArray.push(tempArray);
        let tempCombination = finalArray.flat(2);
        finalArray = [];
        let set = new Set(tempCombination);
        if (tempCombination.length === set.size) {
          this.combinationsArray.push(tempCombination);
          this.courseNames.push(tempCourseNamesArray);
        }
      }
      this.show = true;
    },
    clear: function() {
      this.selectedCourses = [];
      this.combinationsArray = [];
      this.courseNames = [];
      this.show = false;
    }
  }
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  text-align: center;
}
table {
  width: 100%;
}
</style>