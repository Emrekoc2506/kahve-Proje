import tall_Caramel_Macchiato from './image/tallboyCaramelMacchiato.png'
import venti_Caramel_Macchiato from './image/venti Caramel Macchiato.png'
import tall_Latte_Macchiato from './image/tall boy Latte Macchiato.png'
import grande_boy_Latte_Macchiato from './image/grande_boy_Latte_Macchiato.png'
import venti_Latte_Macchiato from './image/venti boy Latte Macchiato.png'
import tallCaramel_Macchiato from './image/tall boy buzlu Caramel Macchiato.png'
import grande_Caramel_Macchiato from './image/grande boy Caramel Macchiato.png'
import ventiCaramel_Macchiato from './image/venti Caramel Macchiato.png'
import tall_Espresso_Macchiato from './image/tall boy Espresso Macchiato.png'
import venti_Espresso_Macchiato from './image/venti boy espresso.png'
import tall_espresso from './image/tall boy espresso.png'
import grande_espresso from './image/grande boy espresso.png'
import venti_espresso from './image/venti boy espresso.png'
import tall_Espresso_con_Panna from './image/tall boy Espresso con Panna.png'
import grande_Espresso_con_Panna from './image/grande boy Espresso con Panna.png'
import venti_Espresso_con_Panna from './image/venti Espresso con Panna.png'
import tall_buzlu_Americano from './image/tall boy buzlu Americano.png'
import grande_buzlu_Americano from './image/grande boy buzlu Americano.png'
import venti_buzlu_Americano from './image/tall boy buzlu Americano.png'
import tall_Americano from './image/tall boy düz Americano.png'
import grande_Americano from './image/grande boy düz Americano.png'
import venti_Americano from './image/venti Americano.png'
import tall_flat_white from './image/tall boy flat white.png'
import grande_flat_white from './image/grande boy flat white.png'
import venti_flat_white from './image/küçük boy flat white.png'
import tall_Ristretto_Bianco from './image/Tall Ristretto Bianco.png'
import grande_Ristretto_Bianco from './image/grande boy Ristretto Bianco.png'
import venti_Ristretto_Bianco from './image/küçük boy Ristretto Bianco.png'
import tall_buzlu_caffe_latte from './image/tall boy buzlu caffe latte.png'
import grande_buzlu_caffe_latte from './image/grande boy buzlu caffe latte.png'
import venti_buzlu_caffe_latte from './image/küçük boy buzlu caffe latte.png'
import tall_caffe_latte from './image/Caffe latte tall.png'
import grande_caffe_latte from './image/grande boy caffe latte.png'
import venti_caffe_latte from './image/venti boy caffe latte.png'
import grande_espresso_macchiato from './image/grande espresso macchiato.png'
import { database } from './firebase/firebase';
import { ref, get, child } from "firebase/database";



export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  imageSrc?: string;
}

const imageMap: Record<string, string> = {
  "tall_Caramel_Macchiato": tall_Caramel_Macchiato,
  "venti_Caramel_Macchiato": venti_Caramel_Macchiato,
  "tall_Latte_Macchiato": tall_Latte_Macchiato,
  "grande_boy_Latte_Macchiato": grande_boy_Latte_Macchiato,
  "venti_Latte_Macchiato": venti_Latte_Macchiato,
  "tallCaramel_Macchiato": tallCaramel_Macchiato,
  "grande_Caramel_Macchiato": grande_Caramel_Macchiato,
  "ventiCaramel_Macchiato": ventiCaramel_Macchiato,
  "tall_Espresso_Macchiato": tall_Espresso_Macchiato,
  "venti_Espresso_Macchiato": venti_Espresso_Macchiato,
  "tall_espresso": tall_espresso,
  "grande_espresso": grande_espresso,
  "venti_espresso": venti_espresso,
  "tall_Espresso_con_Panna": tall_Espresso_con_Panna,
  "grande_Espresso_con_Panna": grande_Espresso_con_Panna,
  "venti_Espresso_con_Panna": venti_Espresso_con_Panna,
  "tall_buzlu_Americano": tall_buzlu_Americano,
  "grande_buzlu_Americano": grande_buzlu_Americano,
  "venti_buzlu_Americano": venti_buzlu_Americano,
  "tall_Americano": tall_Americano,
  "grande_Americano": grande_Americano,
  "venti_Americano": venti_Americano,
  "tall_flat_white": tall_flat_white,
  "grande_flat_white": grande_flat_white,
  "venti_flat_white": venti_flat_white,
  "tall_Ristretto_Bianco": tall_Ristretto_Bianco,
  "grande_Ristretto_Bianco": grande_Ristretto_Bianco,
  "venti_Ristretto_Bianco": venti_Ristretto_Bianco,
  "tall_buzlu_caffe_latte": tall_buzlu_caffe_latte,
  "grande_buzlu_caffe_latte": grande_buzlu_caffe_latte,
  "venti_buzlu_caffe_latte": venti_buzlu_caffe_latte,
  "tall_caffe_latte": tall_caffe_latte,
  "grande_caffe_latte": grande_caffe_latte,
  "venti_caffe_latte": venti_caffe_latte,
  "grande_espresso_macchiato": grande_espresso_macchiato
};

export async function getCourses(): Promise<Course[]> {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `coffee`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Veritabanından gelen ham veri:", data);

      const coursesList = Object.keys(data).map(key => ({
        id: parseInt(key),
        ...data[key]
      }));

      return coursesList.map(course => ({
        ...course,
        imageSrc: imageMap[course.image] || ""
      }));
    } else {
      console.log("Realtime Database'de 'products' verisi bulunamadı.");
      return [];
    }
  } catch (error) {
    console.error("Veri çekilirken bir hata oluştu:", error);
    return [];
  }
}