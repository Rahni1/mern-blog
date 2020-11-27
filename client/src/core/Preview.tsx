import React, {useState, useEffect} from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { API } from "../config";

const Preview = ({match}: {match: any}) => {
    const [post, setPost] = useState<any>({});
    const id = match.params.id;
  const loadSinglePost = (slug: string, id: number) => {
        return fetch(`${API}/api/post/${slug}/${id}`, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .catch((err) => console.log(err));
      };

  useEffect(() => {
    const slug = match.params.slug;
   
    loadSinglePost(slug, id);
  }, [match]);

    return (
            <TabPanel>
            <div className="preview">
              <h1 className="newpost_title preview">{post.title}</h1>
            </div>
            <div className="preview" dangerouslySetInnerHTML={{ __html: post.sanitizedHtml}}></div>
          </TabPanel>
    )
}

export default Preview;