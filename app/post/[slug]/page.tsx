"use client";
import AddComments from "@/app/component/AddComments";
import Posts from "@/app/component/Posts";
import { OnePostType } from "@/app/types/Types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetail = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<OnePostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetail(url.params.slug),
  });

  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <div>
      {data && (
        <>
          <Posts
            id={data?.id}
            name={data?.user.name}
            img={data?.user.image}
            postTitle={data?.title}
            comments={data?.comments}
          />
          <AddComments id={data?.id} />
          {data.comments.map((comment) => (
            <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
              <div className="flex items-center gap-2">
                <Image
                  width={24}
                  height={24}
                  src={comment.user.image}
                  alt="img"
                  className="rounded-full"
                />
                <h3 className="text-bold">{comment.user.name} </h3>
                <h2 className="text-gray-400 text-sm">
                  {comment.createdAt.slice(0, 10)}
                </h2>
              </div>
              <div className="py-3 px-2 rounded-xl my-2 bg-gray-200">
                {comment.message}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostDetail;