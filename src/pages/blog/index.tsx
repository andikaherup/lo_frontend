// ** React Imports
import { useState, useEffect, ReactNode } from 'react'
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'

// ** Layout Import

import React from 'react'
import HTMLDisplayComponent from 'src/layouts/components/blog/htmlDisplay'

interface BlogPost {
  author: string
  created_at: string
  description: string
  id: number
  image: string
  is_active: boolean
  title: string
  updated_at: string
}

const Blog = () => {
  useEffect(() => {
    const initData = async () => {
      // const urlParams = new URLSearchParams(window.location.search)

      // if (urlParams.has('level')) {
      //   console.log(urlParams.get('level'))
      //   setUrlParam(urlParams.get('level') || '')
      // }

      await axios.get(contentConfig.getBlog).then(async res => {
        console.log(res.data.data)
        setBlogData(res.data.data)
      })
    }

    initData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [blogData, setBlogData] = useState<BlogPost[]>()

  // const [selectedTab, setSelectedTab] = useState('All')
  const [detail, setDetail] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost>()

  // const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTab(event.target.value)
  // }

  // const menu = [
  //   {
  //     title: 'All'
  //   },
  //   {
  //     title: 'Career'
  //   },
  //   {
  //     title: 'Leadership'
  //   },
  //   {
  //     title: 'Relationship'
  //   },
  //   {
  //     title: 'Self-Discovery'
  //   },
  //   {
  //     title: 'Technology'
  //   },
  //   {
  //     title: 'Wealth'
  //   }
  // ]

  const detailPage = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setDetail(true)
  }

  return (
    <section className='relative  h-full min-h-screen w-full z-5 overflow-hidden pb-12 px-3 lg:pt-20 pt-5  lg:pb-[90px]'>
      <div className='container w-full pt-20 pb-5 mx-auto lg:px-10'>
        <div className='w-full'>
          <div className='flex justify-center px-2 pb-5'>
            <h1 className='mb-3 text-xl font-bold text-center text-black-300 lg:text-5xl'>
              Personality Insights for Wealth, Career, and Life
            </h1>
          </div>
          {!detail && (
            <>
              {/* <div className='flex justify-center pb-10 mb-4 border-b border-gray-200 dark:border-gray-700'>
                <ul
                  className='flex flex-wrap -mb-px text-sm font-medium text-center'
                  id='default-tab'
                  data-tabs-toggle='#default-tab-content'
                  role='tablist'
                >
                  {menu.map((menu, index) => (
                    <li className='me-2' key={index} role='presentation'>
                      <button
                        className={`inline-block px-4 pb-2  rounded-t-lg ${
                          selectedTab === menu.title ? 'border-b-4 border-b-protectorsynergistbg-300' : ''
                        } `}
                        id='profile-tab'
                        data-tabs-target='#profile'
                        type='button'
                        role='tab'
                        onClick={() => setSelectedTab(menu.title)}
                        aria-controls='profile'
                        aria-selected='false'
                      >
                        {menu.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div>
                <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-5'>
                  {blogData?.map((blog: BlogPost, index: number) => (
                    <div
                      className='w-full transition bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer'
                      key={index}
                      onClick={() => detailPage(blog)}
                    >
                      <img src={blog.image} alt='product image' />

                      <div className='w-full px-2 py-2 lg:px-5 lg:py-5'>
                        <span className='text-xs text-gray-400 lg:text-md'>{blog.author}</span>
                        <h5 className='text-xs font-semibold tracking-tight text-gray-900 lg:text-2xl dark:text-white'>
                          {blog.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {detail && (
            <div className='w-full lg:px-20'>
              <div className='w-full lg:px-20 '>
                <div className='flex justify-center w-full pb-10'>
                  <img src={selectedBlog?.image} alt='product image' className='object-scale-down' />
                </div>
                <div className='flex justify-center w-full text-xs lg:text-lg'>
                  <HTMLDisplayComponent htmlContent={selectedBlog?.description} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

Blog.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Blog.guestGuard = true

export default Blog
