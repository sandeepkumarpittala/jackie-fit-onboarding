import { useLocation } from "react-router-dom";

export default function Summary() {

  const { state } = useLocation();

  const answers = state?.answers || {};
  

 return (

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-gray-200 flex items-center justify-center p-6">

<div className="w-full max-w-3xl bg-white rounded-[32px] shadow-2xl border border-gray-200 p-10">

<div className="text-center">

<div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full mb-5">

🤖 Jackie AI Analysis

</div>

<h1 className="text-5xl font-extrabold text-gray-900">

Your Fit Profile

</h1>

<p className="text-gray-500 mt-3">

Generated using AI Voice Fit Assistant

</p>

</div>

<div className="grid md:grid-cols-2 gap-5 mt-12">

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">📏 Height</h3>

<p className="text-3xl font-bold mt-2">

{answers[1] || "-"}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">⚖ Weight</h3>

<p className="text-3xl font-bold mt-2">

{answers[2] || "Skipped"}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">👖 Waist</h3>

<p className="text-3xl font-bold mt-2">

{answers[3]}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">📐 Hip</h3>

<p className="text-3xl font-bold mt-2">

{answers[4]}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">

✨ Waist Fit

</h3>

<p className="text-2xl font-bold mt-2">

{answers[5]}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">

⬆ Rise

</h3>

<p className="text-2xl font-bold mt-2">

{answers[6]}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">

🦵 Thigh Fit

</h3>

<p className="text-2xl font-bold mt-2">

{answers[7]}

</p>

</div>

<div className="bg-gray-50 rounded-2xl p-5">

<h3 className="font-semibold text-gray-500">

⚠ Biggest Issue

</h3>

<p className="text-2xl font-bold mt-2">

{answers[10]}

</p>

</div>

</div>

<div className="mt-10 bg-gray-50 rounded-3xl p-7">

<h2 className="text-2xl font-bold mb-5">

👖 Previous Denim Brands

</h2>

{(answers[8] || []).length > 0 ? (

<div className="space-y-3">

{answers[8].map((brand)=>(

<div
key={brand}
className="flex justify-between bg-white rounded-xl p-4 shadow-sm"
>

<span className="font-semibold">

{brand}

</span>

<span>

Size {answers[9]?.[brand]}

</span>

</div>

))}

</div>

):( 

<p className="text-gray-500">

No previous brands selected.

</p>

)}

</div>

<button

onClick={()=>

window.location.href="https://jackie-jeans.vercel.app/"

}

className="mt-10 w-full bg-black hover:bg-gray-900 text-white py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-[1.01]"

>

Continue to Jackie Jeans →

</button>

</div>

</div>

);

}