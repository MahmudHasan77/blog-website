import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-white p-3 max-w-xl mx-auto text-sm">
      <div className="w-full flex justify-center items-center relative h-52">
        <Image src={"/download.jpeg"} fill alt="about image" />
      </div>
      <h1 className="font-bold text-center p-3">The identity of Islam</h1>
      The &quot;identity of Islam&quot; refers to submission and obedience to
      God (Allah), a core principle where a Muslim&apos;s identity is defined by
      their relationship with the Creator and their commitment to God&apos;s
      will as outlined in the Quran and Sunnah. This spiritual identity
      integrates into a Muslim&apos;s personal life, shaping their worldview,
      values, and actions, and also fosters a sense of a global community (the
      Ummah) united by faith rather than ethnicity or nationality.
      <h1 className="font-bold p-2">Core Aspects of the Islamic Identity </h1>
      <h1 className="font-bold p-1">Submission to God :</h1>
      The Arabic word &quot;Islam&quot; itself means &quot;submission&quot; to
      God, and a Muslim (one who submits) is someone who dedicates their
      worship, sacrifices, life, and death to Allah.
      <h1 className="font-bold p-1">Following Divine Guidance:</h1>A
      Muslim&apos;s identity is shaped by the guidance found in the Quran and
      the teachings and practices of Prophet Muhammad (Sunnah), which provide a
      framework for daily life.
      <h1 className="font-bold p-1">Comprehensive Faith :</h1> Islamic identity
      is not just about rituals; it encompasses the totality of a Muslim&apos;s
      life, from their dietary choices and etiquettes to their personal ethics
      and interactions with the world.
      <h1 className="font-bold p-1">Ummah (Community) :</h1>
      Being a Muslim connects individuals to a global community of believers,
      forming a social identity that transcends national, tribal, or ethnic
      boundaries.
      <h1 className="font-bold p-1">Existential Framework: </h1>
      Existential Framework: Islamic identity answers fundamental questions
      about one&apos;s origin, purpose in life, and destiny after death,
      offering comfort and meaning by asserting that this life is a gateway to
      an eternal existence. 
    </div>
  );
};

export default page;
