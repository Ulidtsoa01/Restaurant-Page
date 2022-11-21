<template>
  <div v-if="signedIn">
    <v-container class="Top">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <v-col v-for="k in 1" :key="k">
          <!--Server Button-->
          <!--
          <router-link
            :key="$route.path"
            :to="{ path: '/server' }"
            style="text-decoration: none; color: inherit"
          >
            <v-btn outlined color="orange">Server View</v-btn>
          </router-link>
          <router-view :key="$route.fullPath"></router-view>
          -->
            <v-btn outlined color="orange"
            @click="$router.push('/server/'+$route.params.credential)">Server View</v-btn>
          <!--Manager Button-->
          <v-btn elevation="2" class="ma-2" color="warning">Manager View</v-btn>
          <!--Client Button-->
            <v-btn outlined color="orange"
            @click="$router.push('/client/'+$route.params.credential)">Client View</v-btn>
        </v-col>
          <!-- <v-col v-for="k in 1" :key="k">
            <v-btn elevation="2" class="ma-2" outlined color="green"
              >Colorblind Mode</v-btn
            >
        </v-col> -->
      </v-row>
    </v-container>

    <v-container class="Mid">
      <center>
        <h1 class="font-weight-bold">Order Trends</h1>
      </center>
      <br />
      <v-row v-for="j in justify" :key="j" :justify="j">
        <!--Left side-->
        <v-row>
          <v-col cols="12" sm="4">
            <v-date-picker v-model="dates" range></v-date-picker>
            <v-text-field
              v-model="dateRangeText"
              label="Date range"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>

            <v-card>
              <center>
                <p class="font-weight-bold">Generate</p>
                <v-btn
                  @click="click_report('Sales')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Sales Report
                </v-btn>
                <v-btn
                  @click="click_report('Excess')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Excess Report
                </v-btn>
                <v-btn
                  @click="click_report('Restock')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Restock Report
                </v-btn>
                <v-btn
                  @click="click_report('Pairs')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Pairs Together
                </v-btn>
              </center>
            </v-card>
          </v-col>

          <!--Right side-->
          <v-col v-for="k in 1" :key="k">
            <v-data-table :headers="header" :items="items" class="elevation-1">
            </v-data-table>
          </v-col>
        </v-row>
      </v-row>
    </v-container>

    <v-container class="Bottom">
      <v-col v-for="j in justify" :key="j" :justify="j">
        <center>
          <h1 class="font-weight-bold">Inventory</h1>
        </center>
        <v-data-table :headers="inventoryHeader" :items="inventory" sort-by="item_id" class="elevation-1">
          <template v-slot:top>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <center>
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    Add New Item
                  </v-btn>
                </center>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ createTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedInventory.category"
                          :items="categories"
                          item-text="choice"
                          label="Category"
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.item_quantity"
                          label="Quantity"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.vendor"
                          label="Vendor"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Ok</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.edit="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            </template>
          <template v-slot:item.delete="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-container>
  </div>
  <div v-else>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col>
                <p class="text-h1" style="text-align: center; padding-top: 20%">
                Not Signed In
                </p>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
import { getInventory} from "../js/backend.js";
import { addItem } from "../js/backend.js";
import { addInventory } from "../js/backend.js";
import { updateItemItems } from "../js/backend.js";
import { updateItemInventory } from "../js/backend.js";
import { deleteItem } from "../js/backend.js";
import { deleteItemInventory } from '../js/backend.js';
import { getRestockReport } from "../js/backend.js";
import { getExcessReport } from "../js/backend.js";
import { getPairsTogether } from "../js/backend.js";
import { getSalesReport } from "../js/backend.js";
import { loadGoogle, userSignedIn } from '../js/login.js';
import { getLatestItemId } from "../js/backend.js";
import { getLatestInventoryId } from "../js/backend.js";


export default {
  async created() {
    await loadGoogle();
    this.signedIn = await userSignedIn(this.$route.params.credential);
  },
  async mounted() {
    this.inventory = await getInventory();
  },

  data: () => ({
    // Layout
    justify: ["space-between"],

    dates: [],
    header: [],

    dialog: false,
    dialogDelete: false,

    categories: [
      { choice: 'Entree'},
      { choice: 'Side'},
      { choice: 'Protein'},
      { choice: 'Topping'},
    ],

    salesHeader: [
      { text: "Name", value: "name" },
      { text: "Price", value: "price" },
      { text: "Number Sold", value: "num_sold" },
      { text: "Revenue", value: "revenue" },
    ],

    excessHeader: [
      { text: "Name", value: "name" },
      { text: "Number Sold", value: "num_sold" },
      { text: "Item Quantity", value: "item_quantity" },
    ],

    restockHeader: [
      { text: "Name", value: "name" },
      { text: "Number Sold", value: "num_sold" },
      { text: "Item Quantity", value: "item_quantity" },
    ],

    pairsHeader: [
      { text: "Entree", value: "entree_name" },
      { text: "Topping", value: "topping_name" },
      { text: "Occurences", value: "count" },
    ],

    inventoryHeader: [
      // { text: "Inventory ID", value: "id"},
      { text: "Item ID", value: "item_id" },
      { text: "Name", value: "name" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "item_quantity" },
      { text: "Number Sold", value: "num_sold" },
      { text: "Vendor", value: "vendor" },
      // { text: "Batch", value: "batch_quantity" },
      { text: 'Edit', value: 'edit', sortable: false },
      { text: 'Delete', value: 'delete', sortable: false },
    ],

    items: [],

    inventory: [],
    editedIndex: -1,

    defaultInventory: {
      // id: 0,
      item_id: 0,
      name: "",
      category: "",
      calories: 0,
      price: 0.0,
      item_quantity: 0,
      num_sold: 0,
      vendor: "",
      // batch_quantity: 300,
    },

    editedInventory: {
      // id: 0,
      item_id: 0,
      name: "",
      category: "",
      calories: 0,
      price: 0.0,
      item_quantity: 0,
      num_sold: 0,
      vendor: "",
      // batch_quantity: 300,
    },
    signedIn: false,
  }),
  computed: {
    dateRangeText() {
      if (this.dates.length === 0) {
        return "Select Two Dates";
      } else if(this.dates.length == 1) {
        var date0 = new Date(this.dates[0].replace(/-/g, '\/'));
        var from = date0.toLocaleDateString();
        return from;
      }
      else{
        var date1 = new Date(this.dates[0].replace(/-/g, '\/'));
        var date2 = new Date(this.dates[1].replace(/-/g, '\/'));
        if(date1 > date2)
        {
          var temp = this.dates[0];
          this.dates[0] = this.dates[1];
          this.dates[1] = temp;
          [date1, date2] = [date2, date1];
        }
        var from = date1.toLocaleDateString();
        var to = date2.toLocaleDateString();
        return from + ' - ' + to;
      }
    },

    createTitle () {
       if(this.editedIndex == -1)
       {
        return 'Add New Item'
       }
       else
       {
        return 'Edit Existing Item'
       }
      },
  },

  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

  methods: {
    click_report: async function (e) {
      var from = this.dates[0];
      var to;
      if(this.dates.length === 1){
        to = from;
      }
      else{
        to = this.dates[1];
      }
      if (e === "Sales") {
        this.header = this.salesHeader;
        this.items = await getSalesReport(from,to);
      } else if (e === "Excess") {
        this.header = this.excessHeader;
        this.items = await getExcessReport(from,to);
      } else if (e === "Restock") {
        this.header = this.restockHeader;
        this.items = await getRestockReport(from,to);
      } else if (e === "Pairs") {
        this.header = this.pairsHeader;
        this.items = await getPairsTogether(from,to);
        
      }
    },

    editItem(item) {
      this.editedInventory = Object.assign({}, item);
      this.editedIndex = this.editedInventory.item_id
      this.dialog = true;
    },


    deleteItem (item) {
        this.editedInventory = Object.assign({}, item)
        this.editedIndex = this.editedInventory.item_id;
        this.dialogDelete = true
    },
      
   async deleteItemConfirm () {
        // SAFEGUARD TO PREVENT ACCIDENTAL DELETION
        if(this.editedIndex > 28)
        {
          await deleteItemInventory(this.editedIndex);
          await deleteItem(this.editedIndex);
        }
        this.inventory = await getInventory();
        this.closeDelete()
      },

    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedInventory = Object.assign({}, this.defaultInventory)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedInventory = Object.assign({}, this.defaultInventory)
          this.editedIndex = -1
        })
      },

    async save() {
      var temp = this.editedInventory;
      var cat = temp.category;
      if(cat === "Entree")
      {
        cat = "mainEntree"
      }
      else if(cat === "Side")
      {
        cat = "subEntree"
      }
      else if(cat === "Protein")
      {
        cat = "mainProtein"
      }
      else if(cat === "Topping")
      {
        cat = "topping"
      }
      if (this.editedIndex > -1) {
        await updateItemItems(temp.name,temp.price,this.editedIndex);
        await updateItemInventory(temp.name,this.editedIndex)
      }
      else{
        var itemId = await getLatestItemId() + 1;
        var inventoryId = await getLatestInventoryId() + 1;
        await addItem(itemId,temp.name,cat,temp.price,temp.calories);
        await addInventory(inventoryId,itemId,temp.name,temp.item_quantity,temp.num_sold,temp.vendor,1,300);
        if(cat === "mainProtein")
        {
          cat = "subProtein";
          itemId += 1;
          inventoryId += 1;
          var name = "Extra " + temp.name;
          await addItem(itemId,name,cat,temp.price,temp.calories);
          await addInventory(inventoryId,itemId,name,temp.item_quantity,temp.num_sold,temp.vendor,1,300);
        }
      }
      this.inventory = await getInventory();
      this.close();
    },

    // getToday() {
    //   var today = new Date();
    //   var dd = String(today.getDate()).padStart(2, '0');
    //   var mm = String(today.getMonth() + 1).padStart(2, '0');
    //   var yyyy = today.getFullYear();
    //   today = yyyy + '-' + mm + '-' + dd;
    //   return today;
    // },
  },
};
</script>
