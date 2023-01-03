<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="error-template">
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <div class="error-details">
            Sorry, an error has occured, Requested page not found!
          </div>
          <div class="error-actions">
            <router-link :to="{ path: '/dashboard' }">
              <a class="btn btn-success btn-lg"
                ><span class="glyphicon glyphicon-home"></span> Go to dashboard
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  created() {
    // this.replaceURL("Error.vue");
    //  window.history.forward();
    //     function noBack() {
    //         window.history.forward();
    //     }
    // function suppressBackspace(evt) {
    //   evt = evt || window.event;
    //   var target = evt.target || evt.srcElement;
    //   if (evt.keyCode == 8 && !/input|textarea/i.test(target.nodeName)) {
    //     return false;
    //   }
    // }
    // if (window.location != "/error-page")
    //   window.location.replace("/error-page");
    // else return;
    // window.onbeforeunload = function () {
    //   return "Your work will be lost.";
    // };
    // op 01
    // window.history.forward(5);
    window.history.go(2);
    // location.replace(this.href);
    // window.location.href = "/error-page";
    // window.location.replace("/error-page");
    // this.$router.push("error-page");
    // op 02
    // window.location.hash = "no-back-button";
    // // Again because Google Chrome doesn't insert
    // // the first hash into the history
    // window.location.hash = "Again-No-back-button";
    // window.onhashchange = function () {
    //   window.location.hash = "no-back-button";
    // };
    //  op 3
    // window.history.pushState(null, "", window.location.href);
    // window.onpopstate = function () {
    //   window.history.pushState(null, "", window.location.href);
    // };
    // op 04
    // window.history.pushState(null, document.title, location.href);
    // window.history.back();
    // window.history.forward();
    // window.onpopstate = function () {
    //   window.history.go(1);
    // };
  },
  methods: {
    // newWindow(fileName, windowName) {
    //   // msgWindow = window.open(fileName, windowName);
    //   window.open(fileName, windowName);
    // },
    // replaceURL(fileName) {
    //   this.newWindow(fileName, "window2");
    //   self.close();
    // },
  },
};
</script>

<style scoped>
body {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAABHklEQVRIib2Vyw6EIAxFW5idr///Qx9sfG3pLEyJ3tAwi5EmBqRo7vHawiEEERHS6x7MTMxMVv6+z3tPMUYSkfTM/R0fEaG2bbMv+Gc4nZzn+dN4HAcREa3r+hi3bcuu68jLskhVIlW073tWaYlQ9+F9IpqmSfq+fwskhdO/AwmUTJXrOuaRQNeRkOd5lq7rXmS5InmERKoER/QMvUAPlZDHcZRhGN4CSeGY+aHMqgcks5RrHv/eeh455x5KrMq2yHQdibDO6ncG/KZWL7M8xDyS1/MIO0NJqdULLS81X6/X6aR0nqBSJcPeZnlZrzN477NKURn2Nus8sjzmEII0TfMiyxUuxphVWjpJkbx0btUnshRihVv70Bv8ItXq6Asoi/ZiCbU6YgAAAABJRU5ErkJggg==);
}
.error-template {
  padding: 150px 15px;
  text-align: center;
  /* align-items: baseline;*/
}
.error-actions {
  margin-top: 15px;
  margin-bottom: 15px;
}
.error-actions .btn {
  margin-right: 10px;
  color: white;
}
</style>
