import classes from './hero.module.css';
import Image from 'next/image';


function Hero() {
    return (
        <section className={classes.hero}> 
        <div className={classes.image}>
            <Image
             src="/images/site/sid_photo.jpeg"
             alt="Siddharth" 
             width={300} 
             height={300}>
             </Image>
             </div>

         <h1> Hi I'm Siddharth</h1>
            <p>
                I read & write about technology management 
            </p>
        </section>  
    );
}
export default Hero;
