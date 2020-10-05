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
      <div v-for="(item, i) in selectedCourses" :key="item.code">
        <span class="font-weight-bold">{{item.code}} - {{item.course}} - ({{item.ects}} ECTS)</span>
        <span class="font-weight-thin" @click="remove(i)">remove</span>
      </div>
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

import json from "./courses.json";

export default {
  
  data: function() {
    return {
      courses: json.courses,
      selectedCourses: [],
      courseNames: [],
      combinationsArray: [],
      show: false
    };
  },
  mounted: function() {
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
    },
    remove: function(index) {
      this.selectedCourses.splice(index, 1);
      this.findSchedules();
    },
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