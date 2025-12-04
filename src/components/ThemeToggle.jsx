import React, {useState, useEffect} from "react";

export default function themeFunction(){
  const [theme, setTheme] = useState("light")

  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme){
      setTheme(savedTheme)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = ()=>{
    setTheme(theme === "light" ? "dark" : "light")
  }

  return {theme, toggleTheme}
}