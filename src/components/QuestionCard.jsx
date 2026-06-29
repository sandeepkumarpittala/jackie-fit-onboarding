export default function QuestionCard({
question,
value,
setValue,
answers
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">

      <h2 className="text-2xl font-bold mb-8">
        {question.question}
      </h2>

      {/* Dropdown */}
      {question.type === "select" && (
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded-lg p-3 text-lg"
        >
          <option value="">
            Select an option
          </option>

          {question.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Number */}
      {question.type === "number" && (
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your weight"
          className="w-full border rounded-lg p-3 text-lg"
        />
      )}

      {/* Radio Buttons */}
      {question.type === "radio" && (
        <div className="space-y-4">
          {question.options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                value={option}
                checked={value === option}
                onChange={(e) => setValue(e.target.value)}
              />

              <span className="text-lg">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
      {/* Checkbox */}
       {question.type === "checkbox" && (

<div className="grid grid-cols-2 gap-3">

{question.options.map((brand) => (

<label

key={brand}

className="border rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100"

>

<input

type="checkbox"

checked={value.includes(brand)}

onChange={(e) => {

if (e.target.checked) {

setValue([...value, brand]);

} else {

setValue(value.filter((b) => b !== brand));

}

}}

/>

<span>{brand}</span>

</label>

))}

</div>

)}
{/* Brand Size */}

{question.type === "brandSize" && (

<div className="space-y-4">

{(answers[8] || []).map((brand) => (

<div key={brand}>

<label className="block mb-2 font-medium">

{brand}

</label>

<select

className="w-full border rounded-lg p-3"

value={value?.[brand] || ""}

onChange={(e)=>{

setValue({

...value,

[brand]:e.target.value

})

}}

>

<option value="">Select Size</option>

{Array.from({length:29},(_,i)=>24+i).map(size=>(

<option key={size} value={size}>

{size}

</option>

))}

</select>

</div>

))}

</div>

)}
    

    </div>
  );
}