import React from 'react';
import {
    Grid,
    Typography,
    Divider,
    IconButton,
    Card

} from '@material-ui/core';
import { getUrlFromString, trimQuots, getStringMonth} from 'utils/string';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';

function ListingPanel(props)
{
    const {postsList, classes} = props;
    return(
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="space-evenly"
        >
        {
            postsList.map(function(post){
                var postData = post.docData;
                var unformattedImage = getUrlFromString(postData.postContent);
                var formattedImage = [];
                for(var i=0; i < unformattedImage.length; i++)
                {
                    var temp = trimQuots(unformattedImage[i]);
                    formattedImage.push(temp);
                }
                let date = new Date(postData.postOn);
                    let formated = date.getDay()+"th "+getStringMonth(date.getMonth())+" "+date.getFullYear();
                return(
                    <Card
                        className={classes.card}
                    >
                        <Grid
                            container
                            className={classes.imageContainer}
                        >
                            <img alt={postData.title} src={formattedImage[0]} className={classes.image}/>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            className={classes.titleWrapper}
                        >
                            <Typography
                                variant= "h5"
                                style={{textAlign: "center",fontWeight:"bold"}}
                            >
                                {postData.postTitle}
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid
                            container
                            alignItems="flex-start"
                        >
                            <Grid
                                item
                                xs
                            >
                                <Typography
                                    variant="body"
                                    className={classes.postedBy}
                                >
                                    {"Posted By : "+postData.postBy}
                                </Typography>
                                
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            alignItems="flex-start"
                        >
                            <Grid
                                item
                                xs
                            >
                                <Typography
                                    variant="body"
                                    className={classes.postedOn}
                                >
                                    {"Posted On : "+formated}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            alignItems="flex-start"
                        >
                            <Grid
                                item
                                xs
                                className={classes.iconWrapper}
                            > 
                                <FavoriteIcon className={classes.like}/>
                                <Typography variant="subtitle2" style={{marginTop: "-1vh"}}>
                                    {postData.postLikes.length}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs
                                className={classes.iconWrapper}
                            >
                                <ChatIcon className={classes.comment}/>
                                <Typography variant="subtitle2" style={{marginTop: "-1vh"}}>
                                    {postData.postComments.length}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs
                                className={classes.iconWrapper}
                            >
                                <ShareIcon className={classes.share}/>
                                <Typography variant="subtitle2" style={{marginTop: "-1vh"}}>
                                    {1}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs
                                className={classes.iconWrapper}
                            >
                                <IconButton>
                                    <VisibilityIcon className={classes.view}/> View
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Card>
                );
            })
        }
        </Grid>
    );
}
export default ListingPanel;