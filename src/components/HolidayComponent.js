import { Component } from "react";
import  './HolidayComponent.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { WebApi } from "../Api/WebApi"
import moment from 'moment';
class HolidayComponent extends Component{
  
    constructor(props) {
        super(props)
        this.state={
          startDate: new Date(),
          endDate: new Date(),
          countryList:[],
          selectedCountryCode: null,
          selectedRegion:null,
          selectedPosition: -1,
          availiableRegion:[],
          parsedFromDate:"",
          parsedToDate:"",
          selectedCountryDesc:[]
        
       }

       this.handleFromDateChange = this.handleFromDateChange.bind(this);
       this.handleToDateChange = this.handleToDateChange.bind(this);
      }
      

      componentDidMount(){
        this.getCountryList()

      }

      getCountryList(){
        WebApi.getCountryList()
        .then((response) => {
          
          if (response.data) {
            this.setState({
              countryList:response.data,
              selectedCountryCode:response.data[0].countryCode
            })
          } else {
             console.log("failed")
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
     

      getHolidayList(payload){
        WebApi.getHolidayList(payload)
        .then((response) => {
         
          if (response.data) {
             this.setState({
              selectedCountryDesc:response.data,
             })
          } else {
             console.log("failed")
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }

      convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day,mnth,date.getFullYear()].join("-");
      }
      
      
      handleOnSubmit(){
        let payload=
      {"fromDate":this.convert(this.state.startDate),"toDate":this.convert(this.state.endDate),"country":this.state.selectedCountryCode,"region":this.state.selectedRegion}
      console.log(JSON.stringify(payload))
      this.getHolidayList(payload)
     
       }
      

      handleFromDateChange(date) {
        this.setState({
          startDate: date,
          parsedToDate:date
        })
       
      }

      handleToDateChange(date) {
        this.setState({
          endDate: date,
         
        },()=>{})
      }

      handleSelectCountry = async (e) => {
        this.setState({
          selectedCountryCode: e.target.value,
           selectedRegion:null
        },()=>{
          console.log(this.state.selectedCountryCode)
        })
        
      }

      handleSelectedRegion = async (e) => {
        this.setState({
          selectedRegion: e.target.value,
        },()=>{
          console.log(this.state.selectedRegion)
        })
        
      }

     

      render(){
        const mycountryList=this.state.countryList;
        const selectedCountryDesc=this.state.selectedCountryDesc;
        return(

          <div class="comp-body">
              <h1>Holidays App</h1>
             
                <div className="col-12 mt-3">
                <div className="white-box p-3"> 
                <div class="form-group">
                    <h6>Please Select Country</h6>
                    <select
                      class="form-control dropdownCss pl-0"
                      value={this.state.selectedCountryCode}
                      onChange={(e,index) => this.handleSelectCountry(e,index)}
                    >
                      {mycountryList.map((obj,index)=>{
                        return <option id={obj.countryCode} key={index} value={obj.countryCode}>
                        {obj.fullName}
                      </option>
                      })}
                       
                    </select>

                    {mycountryList.filter(country=>country.countryCode===this.state.selectedCountryCode).map((obj,index)=>{
                      
                      return obj.regions.length>0?
                      <div class="commonmargin">
                         <h6>Please Select Region</h6>
                         <select
                      class="form-control dropdownCss pl-0"
                      value={this.state.selectedRegion}
                      onChange={(e,index) => this.handleSelectedRegion(e,index)}
                    >
                      {obj.regions.map((newobj,index)=>{
                          return <option id={newobj} key={index} value={newobj}>
                          {newobj}
                        </option>
                        })
                         
                      }
                       
                    </select>
                      </div>
                     
                      :<div></div>
                    })}
                   
                  </div>
                </div>
                </div>


             <h6>Please Select From Date</h6>
              <DatePicker
               selected={ this.state.startDate }
               onChange={ this.handleFromDateChange }
               name="startDate"
               dateFormat="dd-MM-yyyy"
               minDate={new Date()}
               showYearDropdown
               scrollableMonthYearDropdown
              />

            <h6 class="commonmargin-1">Please Select To Date</h6>
            <DatePicker
               selected={ this.state.endDate }
               onChange={ this.handleToDateChange }
               name="endDate"
               dateFormat="dd-MM-yyyy"
               minDate={new Date()}
               showYearDropdown
               scrollableMonthYearDropdown
              />  
            <div class="element-center commonmargin">
            <button type="button" class="btn btn-primary" onClick={()=>this.handleOnSubmit()}>Submit</button>
            </div>
          
           {selectedCountryDesc && selectedCountryDesc.length>0?<div>
             <h6 class="commonmargin display">Below is the Holiday List</h6>
             <div >
             {selectedCountryDesc.map((obj,index)=>{
                return obj.name.map((newobj,index)=>{
                    return <div class="list commonmargin-1">{newobj.text}</div>
                 })
           })}
                </div>
           </div>:<div class="commonmargin display">No Data Found</div>}
          </div>
          
        );
      }
}
export default HolidayComponent;
