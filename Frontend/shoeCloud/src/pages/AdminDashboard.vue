<template>
  <div class="page-background">
    <main>
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome to ShoeCloud</h1>
          <p>
            The Ecuadorian footwear platform with nationwide coverage. Shop, compare, and enjoy your favorite brands from anywhere in the country.
          </p>
        </div>
        <div class="hero-image">
        </div>
      </section>

      <section class="about">
        <h2>What is ShoeCloud?</h2>
        <p>
          ShoeCloud is a 100% Ecuadorian online store that connects manufacturers, brands, and buyers in a modern, efficient, and secure digital experience. Our mission is to simplify access to quality footwear throughout the country.
        </p>
      </section>

      <section class="features">
        <div class="feature">
          <div class="titulos">
            <h3>Nationwide Catalog</h3>
          </div>
          <p>
            Explore footwear of all styles, sizes, and top brands — all in one place, with delivery to any city in Ecuador.
          </p>
        </div>
        <div class="feature">
          <div class="titulos">
            <h3>Smart Shopping</h3>
          </div>
          <p>
            Compare prices, ratings, and availability in real time thanks to our smart and constantly updated platform.
          </p>
        </div>
        <div class="feature">
          <div class="titulos">
            <h3>Total Confidence</h3>
          </div>
          <p>
            Security system with authentication and monitoring to protect your data and guarantee a safe shopping experience.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>



<script>   
export default {
  name: 'HomeView',
  components: { 

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');


.page-background {
  font-family: 'Poppins', sans-serif; 
  background-color: #fcfcff;
  min-height: 100vh;
  padding: -100%;
  animation: backgroundShift 10s ease-in-out infinite;
}

.feature-image {
  width: 100%; 
  max-width: 150px; 
  height: auto; 
  margin-bottom: 10px;
  transition: transform 0.5s ease-in-out; 
}

.imagen1{
  width: 400px;
  position: relative;
  top: -120px; 
  left: 25px; 

}

.titulos h3{
  font-weight: bold;
}

.etalent-page {
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #000;
  color: #fff;
}

.btn {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
}

.hero {
  display: flex;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  height: 500px;
}


.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
}

.hero-image {
  flex: 1;
  background-image: url('../assets/ShoeCloud.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media only screen and (max-width: 768px) {
  .hero {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .hero-content {
    padding-right: 0;
    text-align: center;
  }

  .hero-image {
    width: 100%;
    height: 200px; 
  }

  .imagen1 {
    width: 100%;
    top: 0;
    left: 0;
    margin-bottom: 20px; 
  }

  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature {
    margin-bottom: 2rem;
  }

  .feature-image {
    max-width: 100px; 
  }
}

.about {
  background-color: #000;
  color: #fff;
  padding: 2rem;
  text-align: center;
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 2rem;
}

.feature {
  text-align: center;
  max-width: 300px;
}

.feature-image:hover {
  transform: scale(1.1); /* Efecto de zoom al pasar el cursor */
}

footer {
  background-color: #000;
  color: #f1f2f1  ;
  text-align: center;
  padding: 1rem;
}

</style>