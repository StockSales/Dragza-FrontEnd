import { Link } from '@/i18n/routing';
import RegForm from "@/components/partials/auth/reg-form";
import Image from "next/image";
import Copyright from "@/components/partials/auth/copyright";
import Logo from "@/components/partials/auth/logo";
import Social from "@/components/partials/auth/social";
const Register = () => {
  return (
    <>
      <div className="flex w-full items-center overflow-hidden min-h-lvh h-lvh basis-full shadow-2xl rounded-xl">
        <div className="overflow-y-auto flex flex-wrap w-full h-dvh">
          <div
            className="hidden flex-1 overflow-hidden text-[40px] leading-[48px] text-default-600 relative z-1 bg-default-50 lg:flex justify-center items-center">
            <div className="w-fit flex justify-center items-center">
              <Image src={"/LOGO.png"} alt={"logo"} width={50} height={50} className="w-72 flex justify-center items-center mb-10"/>
            </div>
          </div>
          <div className="flex-1 relative dark:bg-default-100 bg-white ">
            <div className=" h-full flex flex-col">
              <div className="max-w-[524px] md:px-[42px] md:py-[44px] p-7  mx-auto w-full text-2xl text-default-900  mb-3 h-full flex flex-col justify-center">
                <div className="text-center 2xl:mb-10 mb-5">
                <div className="flex text-center mb-6 lg:hidden justify-center ">
                  <div className="flex justify-center items-center">
                    <Logo />
                  </div>
                </div>
                  <h4 className="font-medium">Sign up</h4>
                  <div className="text-default-500  text-base">
                    Create an account to start using DrugZA
                  </div>
                </div>
                <RegForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
