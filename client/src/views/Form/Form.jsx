import { useState , useEffect} from "react";
import style from './Form.module.css';
import { createDog, getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {

    const dispatch = useDispatch();
    const {dogs_backup, temperaments} = useSelector(state=>state)
  
    useEffect( () => { dispatch(getTemperaments())},[] );  


    const [form, setForm] = useState({ 
        name:'',
        height_min:'',
        height_max:'',
        weight_min:'',
        weight_max:'',
        life_span:'',
        image:'',
        temperamentId: [],
        tempName: []
    })

    const [errors,setErrors] = useState({
        name:'',
        height_min:'',
        height_max:'',
        weight_min:'',
        weight_max:'',
        life_span:'',
        image:'',
        temperamentId: []
    })

    const changeHandler= (event)=>{ 
        const property = event.target.name; 
        const value =  event.target.value;  
         
        setForm({...form, [property]:value})   
        setErrors(validate({...form, [event.target.name]:event.target.value})); 
    }   

    
    const submitHandler = (e) => {
            e.preventDefault();
                
            if (Object.keys(errors).some(key => errors[key])) {
              console.log('Form has errors');
              alert('You need to fill all mandatory fields correclty before submitting');
              return;
            }          
            dispatch(createDog(form));
            
            alert("Dog created successfully");
            setForm({
              name:'',
              height_min:'',
              height_max:'',
              weight_min:'',
              weight_max:'',
              life_span:'',
              image:'',
              temperamentId: ''
            });
          }
          const selectHandler = event=> {
            const id = event.target.value;
            const selectedTemp = temperaments.find(t=> t.id == id)
            setForm({...form, temperamentId:[...form.temperamentId, id], tempName:[...form.tempName, selectedTemp?.name]})    
         
           console.log(form.tempName);
          };
          
          const deleteTemp = (index)=>{
           const temperamentIdClean = [...form.temperamentId]
           const tempNameClean = [...form.tempName]
           tempNameClean.splice(index, 1);
           temperamentIdClean.splice(index, 1);
            setForm({...form, temperamentId:[temperamentIdClean], tempName:[tempNameClean]})
            console.log(tempNameClean, temperamentIdClean);
          }

    const validate = (form) => {
        let nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
        let errors = {};
        let nameExists = false;
  

         const namefilterd = dogs_backup.filter((el) => el.name === form.name);
         if (namefilterd.length) {
           nameExists = true;
         }
         
         if (nameRegex.test(form.name)) {
           errors.name = '';
         } else {
           errors.name = " - Breed name can only contain letters";
         }
         
      
         if (nameExists) {
           errors.name = " - Breed name already exists";
         } else if (!form.name.trim()) {
           errors.name = " - Breed name is mandatory";
         }
      
        if (form.height_min.trim() && isNaN(form.height_min.trim()) || Number(form.height_min.trim()) > 100) {
          
          errors.height_min = " - Height minimum should be a number less than 100";
        }
      
        if (form.height_max.trim() && isNaN(form.height_max.trim()) || Number(form.height_max.trim()) > 100) {
          errors.height_max = " - Height maximum should be a number less than 100";
        }
      
        if (form.weight_min.trim() && isNaN(form.weight_min.trim()) || Number(form.weight_min.trim()) > 100) {
          errors.weight_min = " - Weight minimum should be a number less than 100";
        }
      
        if (form.weight_max.trim() && isNaN(form.weight_max.trim()) || Number(form.weight_max.trim()) > 100) {
          errors.weight_max = " - Weight maximum should be a number less than 100";
        }
      
        if (form.life_span.trim() && isNaN(form.life_span.trim()) || Number(form.life_span.trim()) > 25) {
          errors.life_span = " - Life span should be a number less than 25";
        }
      
        if (!form.weight_min && !form.weight_max) {
            errors.weight_min = "- At least one weight field (minimum or maximum) must be completed";
          }
        
          if (!form.height_min && !form.height_max) {
            errors.height_min = "- At least one height field (minimum or maximum) must be completed";
          }
        
          if (!form.life_span) {
            errors.life_span = "- Life span is mandatory";
          }
      
        return errors;
      };
      

    return(
        <form onSubmit={submitHandler} className={style.formContainer}>
            <div className={style.box}>
                <label className={style.label}>Name: </label>             
             <input className={style.input} type='text' name='name' value={form.name} onChange={changeHandler}></input>
             </div>  
              {errors.name && <span style={{color:'red'}}>{errors.name}</span>}
             
             
            <div>
                <label>Height Min: </label>
                <input type='text' name='height_min' value={form.height_min} onChange={changeHandler}></input>
                <span> Cm.</span>
                </div>

                {errors.height_min && <span style={{color:'red'}}>{errors.height_min}</span>}

           
            <div>
                <label>Height Max: </label>
                <input type='text' name='height_max' value={form.height_max} onChange={changeHandler}></input>
                <span> Cm.</span>

              </div>
                {errors.height_max && <span style={{color:'red'}}>{errors.height_max}</span>}

           
            <div>
                <label>Weight Min: </label>
                <input type='text' name='weight_min' value={form.weight_min} onChange={changeHandler}></input>
                <span> Kgs.</span>
                </div>
                {errors.weight_min && <span style={{color:'red'}}>{errors.weight_min}</span>}

           
            <div>
                <label>Weight Max: </label>
                <input type='text' name='weight_max' value={form.weight_max} onChange={changeHandler}></input>
                <span> Kgs.</span>
                </div>
                {errors.weight_max && <span style={{color:'red'}}>{errors.weight_max}</span>}

            
            <div>
                <label>Life Span: </label>
                <input type='text' name='life_span' value={form.life_span} onChange={changeHandler}></input>
                </div>
                {errors.life_span && <span style={{color:'red'}}>{errors.life_span}</span>}

           
            <div>
                <label>Image: </label>
                <input type='text' name='image' value={form.image} onChange={changeHandler}></input>
            </div>
            <div>
                <label>Temperament: </label>
                <select onChange={ e => selectHandler(e)} >
                <option disabled value='title'>Select Temperament</option>
                  {temperaments?.map(temp=>{
                    return(
                      <option key={temp.id} value={temp.id}>{temp.name}</option>)                      
                  })}                
                </select>
              
               
           
                
            </div>
            <button className={style.button} type='submit'>CREATE</button>
            
        </form>
    )
}

export default Form;
/*  <ul>
                 {form.tempName?.map((name, index)=>{
                  return(
                    <li key= {index}>{name}
                    <button onClick={deleteTemp(index)}>X</button>
                    </li>
                  )
                 })}
                 
                </ul>*/