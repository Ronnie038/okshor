import News from '../../Components/News/News';
import VideosNews from './VideosNews/VideosNews';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import productImage from '../../assets/Home/book1.png';

const categoryData = ['job', 'bangladesh', 'world'];
const NewsBd = () => {
	return (
		<div>
			<div className='flex flex-col md:flex-row md:gap-4 w-10/12 md:w-[88%] lg:w-10/12 mx-auto '>
				<div className='w-full md:w-[83%]  md:order-1 order-2'>
					<div>
						{/* {jobNewses && (
							<div>
								<News news={jobNewses}></News>
							</div>
						)} */}
					</div>
					<div>
						{categoryData.map((cate) => (
							<News key={cate} category={cate}></News>
						))}
					</div>

					<div>
						<VideosNews category={'video'}></VideosNews>
					</div>
				</div>
				<div className='w-11/12 mx-auto md:w-[17%] order-1 md:order-2'>
					<div className='sticky top-3'>
						<p className='text-indigo-900 font-bold mb-2 uppercase'>
							Newest :{' '}
						</p>
						<Link to='/shop'>
							{' '}
							<div>
								<div className='relative product flex flex-col justify-between cursor-pointer lg:border p-3 rounded-md h-[360px] '>
									<div className='p-1 transition-all duration-300 '>
										<img
											src={productImage}
											className='w-full h-auto object-contain max-w-full max-h-60 hover:text-white productImg transition-all duration-300 '
											alt='Book 1'
										/>
									</div>
									<h3 className='text-sm font-semibold mt-3 '>product1</h3>

									<div className='flex justify-between items-center gap-5 my-4 '>
										<div className='flex gap-3 items-center text-gray-500 '>
											<p className=' text-[15px] line-through'>25৳</p>
											<span className='text-[18px]'>30৳</span>
										</div>

										<button className='md:px-3 px-1 py-1 md:py-2 border bg-indigo-900 hover:bg-red-600 font-semibold md:text-[10px] text-[9px] text-white transition-all duration-300 rounded-md'>
											Add to Cart
										</button>
									</div>
									<div className='flex productCart gap-5 flex-col absolute right-0 top-28'>
										<Link to=''>
											<Icon
												icon='basil:shopping-cart-solid'
												className=' text-3xl hover:bg-secondary transition-all duration-300 border border-white border-r-0 hover:border-secondary text-white pl-2 pr-5 py-2 w-full h-full rounded-l-xl'
											/>
										</Link>
									</div>
								</div>
								{/* <div className="border w-[300px] singleItem relative ">
      <div className=" p-1">
        <div className=" relative h-[350px]">
          <img src={image} className="h-full w-full object-contain" alt="" />
          <div className="overlay"></div>
        </div>
        <div>
          <h1 className="text-[15px] font-semibold my-2">{title}</h1>
          <div>
            <div className="flex gap-3 text-[12px] my-2">
              <span className="flex text-[#898989]">
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
              </span>
              <h2 className="text-[#898989] underline">
                1 <span className="ml-1">Reviews</span>
              </h2>
            </div>
            <div>
              {" "}
              <span className="price mr-4 font-semibold"> £ 36.00 </span>
              <span className="price line-through text-[16px] text-[#999999] font-semibold">
                {" "}
                £ 36.00{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] showDiv mx-auto absolute top-[50%] left-[20%] text-center">
        <div className="flex gap-3 w-[100%] text-center justify-between items-center">
          <h1 className="border-2 px-4 py-3 border-white bg-transparent hover:bg-[#c06b81] text-white">
            <Icon icon="ion:cart-outline" />
          </h1>
          <h1 className="border-2 px-4 py-3 border-white bg-transparent hover:bg-[#c06b81] text-white">
            <Icon icon="iconamoon:heart-fill" />
          </h1>
          <h1 className="border-2 px-4 py-3 border-white bg-transparent hover:bg-[#c06b81] text-white">
            <Icon icon="pajamas:chart" />
          </h1>
        </div>
        <button className="uppercase mt-2 w-[100%] font-bold px-4 py-2 bg-white text-black hover:bg-[#c06b81] hover:text-white">
          Quick View
        </button>
      </div>
    </div> */}
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsBd;
