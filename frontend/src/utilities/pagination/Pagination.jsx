import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onPageChange, totalItems, page, perPage = 10, ...props }) => {
  const pageCount = Math.ceil(totalItems / perPage);
  console.log(pageCount,"pg")

  return (
    pageCount > 1 && (
      <ReactPaginate
        onPageChange={onPageChange}
        forcePage={Number(page) - 1}
        containerClassName="flex !m-3"
        pageCount={pageCount}
        pageClassName="min-w-[24px] min-h-[24px] flex justify-center mx-0.5 rounded-[3px] hover:bg-neutral-100 hover:!text-white cursor-pointer leading-[24px] select-none"
        pageLinkClassName="w-full px-1 !text-[#8BA8BE] text-center"
        activeClassName="bg-primary-500 hover:bg-primary-500 rounded-[3px] !cursor-default"
        activeLinkClassName='!text-white'
        nextClassName="min-w-[24px] bg-neutral-100 hover:bg-neutral-200 rounded-[3px] ml-0.5 select-none cursor-pointer"
        nextLinkClassName="w-full h-full flex justify-center items-center cursor-pointer"
        previousClassName="min-w-[24px] bg-neutral-100 hover:bg-neutral-200 rounded-[3px] mr-0.5 select-none cursor-pointer"
        previousLinkClassName="w-full h-full flex justify-center items-center cursor-pointer"
        breakLinkClassName='!text-[#8BA8BE] rounded-full select-none'
        disabledClassName="bg-[#F6F6F6] opacity-30"
        disabledLinkClassName='bg-neutral-50 rounded-[3px] !cursor-default'
        {...props}
      />
    )
  );
};

export default Pagination;
