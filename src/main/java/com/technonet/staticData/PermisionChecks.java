package com.technonet.staticData;

import com.technonet.Enums.PERMISSIONS;
import com.technonet.model.*;
import org.jetbrains.annotations.NotNull;

/**
 * Created by kakha on 3/2/2017.
 */
public class PermisionChecks {
    static public boolean isAdmin(User user) {
        return user.getPermissions().stream().filter(permission -> permission.getCode().equals(PERMISSIONS.admin.name())).count() > 0;
    }

    static public boolean FileManagement(Session session) {

        return session.isIsactive() && session.getUser().getPermissions().stream().filter(permission -> permission.getCode().equals(PERMISSIONS.fileManagement.name())).count() > 0;

    }

    static public boolean isAdmin(Session session) {
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.admin.name()))
                .count() > 0;
    }
    static public boolean categoriesManagement(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.categories.name()))
                .count() > 0;
    }
    static public boolean documentTypes(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.docTypes.name()))
                .count() > 0;
    }
    static public boolean userManagement(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.users.name()))
                .count() > 0;
    }
    static public boolean galleryManagement(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.gallery.name()))
                .count() > 0;
    }
    static public boolean scheduleManagement(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.scheduling.name()))
                .count() > 0;
    }
    static public boolean categoryConfirmation(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.categoryConfirmation.name()))
                .count() > 0;
    }
    static public boolean orderManagement(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.orders.name()))
                .count() > 0;
    }
    static public boolean stringsManagement(Session session){
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.strings.name()))
                .count() > 0;
    }

    public static boolean student(Session session) {
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.student.name()))
                .count() > 0;
    }
    public static boolean storeProductManagement(Session session) {
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.store_product_management.name()))
                .count() > 0;
    }
    public static boolean teacher(Session session) {
        return session.isIsactive() && session.getUser()
                .getPermissions().stream()
                .filter(permission -> permission.getCode().equals(PERMISSIONS.teacher.name()))
                .count() > 0;
    }

    public static boolean ownOrder(Session session, Order order) {
        return session.isIsactive() &&(
                        session.getUser().getId()==order.getUser().getId()||
                        session.getUser().getId()==order.getTeacher().getId());
    }

    public static boolean ownProduct(Session session, StoreProduct product) {

        return session.isIsactive()&&
                session.getUser().getStore().getId()==product.getStore().getId();
    }
}
